import bindAll from 'lodash.bindall'
import React from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import {
    openLoadingProject,
    closeLoadingProject,
    openAkariSave,
    closeAkariSave,
    openTipsLibrary
} from '../../reducers/modals'
import { setFileTitle } from '../../reducers/akari'
import ipcRenderer from '../../lib/akari'

class MenuFile extends React.Component {
    constructor(props) {
        super(props)
        bindAll(this, [
            'fileNew',
            'fileSave',
            'saveAsFile',
            'saveFile',
            'modalSave',
            'switchType',
            'newClick',
            'loadClick',
            'saveClick',
            'saveAsClick',
            'exampleClick'
        ])
        this.type = ''
        this.savePath = ''
        this.loadFileId = '00'
        this.loadFileName = '00'
    }

    componentDidMount() {
        window.addEventListener('modal-save', this.modalSave)

        ipcRenderer.on('load-file', (_, err, savePath, fileTitle, data) => {
            if (err) return toast('打开失败', { autoClose: 2e3 })
            this.savePath = savePath
            this.props.setFileTitle(fileTitle || this.loadFileName)
            if (data) {
                this.props.openLoadingProject()
                this.props.vm
                    .loadProject(new Uint8Array(data))
                    .then(this.props.closeLoadingProject)
                    .catch(err => {
                        this.props.closeLoadingProject()
                        toast('打开失败', { autoClose: 2e3 })
                    })
            }
        })

        ipcRenderer.on('should-close', () => {
            this.type = 'close'
            this.props.openAkariSave()
        })
    }

    componentWillUnmount() {
        window.removeEventListener('modal-save', this.modalSave)
        ipcRenderer.removeAllListeners('load-file')
        ipcRenderer.removeAllListeners('should-close')
    }

    fileNew() {
        this.savePath = ''
        this.props.setFileTitle('未命名.sb3')
        this.props.openLoadingProject()
        const storage = this.props.vm.runtime.storage
        storage
            .load(storage.AssetType.Project, 0, storage.DataFormat.JSON)
            .then(projectAsset => {
                if (projectAsset) {
                    return this.props.vm.loadProject(projectAsset.data).then(() => {
                        setTimeout(this.props.closeLoadingProject, 600)
                    })
                }
            })
            .catch(() => {
                this.props.closeLoadingProject()
                toast('新建失败', { autoClose: 2e3 })
            })
    }

    fileSave(cb) {
        this.props.vm.saveProjectSb3().then(content => {
            const reader = new FileReader()
            reader.onload = () => cb(reader.result)
            reader.readAsArrayBuffer(content)
        })
    }

    saveAsFile(cb) {
        this.fileSave(data => {
            ipcRenderer.once('save-as-file', (_, err, savePath, fileTitle) => {
                if (err) return toast('保存失败', { autoClose: 2e3 })
                if (!savePath) return
                if (this.type === 'save') {
                    this.savePath = savePath
                    this.props.setFileTitle(fileTitle)
                }
                typeof cb === 'function' && cb()
            })
            ipcRenderer.send('IPC', {
                type: 'save-as-file',
                title: this.props.fileTitle,
                data: [...new Uint8Array(data)]
            })
        })
    }

    saveFile(cb) {
        this.fileSave(data => {
            ipcRenderer.once('save-file', (_, err) => {
                if (err) return toast('保存失败', { autoClose: 2e3 })
                toast('保存成功', { autoClose: 2e3 })
                typeof cb === 'function' && cb()
            })
            ipcRenderer.send('IPC', { type: 'save-file', savePath: this.savePath, data: [...new Uint8Array(data)] })
        })
    }

    modalSave(e) {
        this.loadFileId = e.detail.uri || '00.sb3'
        this.loadFileName = e.detail.name || this.loadFileId
        const num = e.detail.num
        if (num > 0) {
            this.saveAsFile(this.switchType)
        } else if (num === 0) {
            this.switchType()
        }
    }

    switchType() {
        const type = this.type
        if (type === 'new') {
            this.fileNew()
        } else if (type === 'load') {
            ipcRenderer.send('IPC', { type: 'load-file' })
        } else if (type === 'close') {
            setTimeout(() => ipcRenderer.send('IPC', { type: 'should-close' }), 500)
        } else if (type === 'load-id') {
            ipcRenderer.send('IPC', { type: 'load-file-id', id: this.loadFileId })
        }
    }

    newClick() {
        this.type = 'new'
        this.props.onRequestClose()
        this.props.openAkariSave()
    }
    loadClick() {
        this.type = 'load'
        this.props.onRequestClose()
        this.props.openAkariSave()
    }
    saveClick() {
        this.type = 'save'
        this.props.onRequestClose()
        if (this.savePath) {
            this.saveFile()
        } else {
            this.saveAsFile()
        }
    }
    saveAsClick() {
        this.type = 'save-as'
        this.props.onRequestClose()
        this.saveAsFile()
    }
    exampleClick() {
        this.type = 'load-id'
        this.props.openTipsLibrary()
        this.props.onRequestClose()
    }

    render() {
        const { className, onClickFile, children } = this.props
        return (
            <div className={className} onMouseUp={onClickFile}>
                <span>文件</span>
                {children(this.newClick, this.loadClick, this.saveClick, this.saveAsClick, this.exampleClick)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    fileTitle: state.scratchGui.akari.fileTitle
})

const mapDispatchToProps = dispatch => ({
    openAkariSave: () => dispatch(openAkariSave()),
    closeAkariSave: () => dispatch(closeAkariSave()),
    closeLoadingProject: () => dispatch(closeLoadingProject()),
    openLoadingProject: () => dispatch(openLoadingProject()),
    setFileTitle: fileTitle => dispatch(setFileTitle(fileTitle)),
    openTipsLibrary: () => dispatch(openTipsLibrary())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuFile)
