import React from 'react'
import { toast } from 'react-toastify'

import ipcRenderer from '../../lib/akari'

class MenuBoard extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        ipcRenderer.on('uploadHex-status', (_, status) => {
            this.status = status
            if (status === 'verify') {
                this.uploadId = toast('正在编译...', { closeButton: false })
            } else {
                if (this.uploadId) {
                    toast.update(this.uploadId, { render: '正在上传...', closeButton: false })
                } else {
                    this.uploadId = toast('正在上传...', { closeButton: false })
                }
            }
        })
        ipcRenderer.on('uploadHex-err', () => {
            // TODO: 显示失败信息
            toast.update(this.uploadId, { render: this.status === 'verify' ? '编译失败' : '上传失败', autoClose: 2e3 })
            this.uploadId = null
        })
        ipcRenderer.on('uploadHex-ok', () => {
            toast.update(this.uploadId, { render: '上传成功', autoClose: 2e3 })
            this.uploadId = null
        })
    }
    componentWillUnmount() {
        ipcRenderer.removeAllListeners('uploadHex-status')
        ipcRenderer.removeAllListeners('uploadHex-err')
        ipcRenderer.removeAllListeners('uploadHex-ok')
    }
    render() {
        return <span>控制器</span>
    }
}

export default MenuBoard
