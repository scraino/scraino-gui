import React from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import { setPorts, setPort } from '../../reducers/akari'
import ipcRenderer from '../../lib/akari'

class MenuPort extends React.Component {
    constructor(props) {
        super(props)
        this.enqueue = []
        this.wrote = true
        this.running = false
    }
    componentDidMount() {
        this.props.vm.addListener('PROJECT_RUN_STOP', this.onProjectRunStop.bind(this))
        this.props.vm.runtime.serialPortWrite = (data, encoding, cb) => {
            if (!this.props.port) {
                return cb()
            }
            this.enqueue.push([data, encoding, cb])
            this.running = true
            this.nextWrite()
        }

        ipcRenderer.on('spData', (_, data) => {
            if (!this.running) return
            this.props.vm.emit('spData', data)
        })

        ipcRenderer.on('spError', (_, err) => {
            this.props.vm.stopAll()
            this.props.setPort(null)
            toast(err === 'disconnected' ? '串口断开连接' : '串口发生错误', { autoClose: 2e3 })
        })

        ipcRenderer.on('spList', (_, ports) => {
            if (ports.length > this.props.ports.length) {
                setTimeout(() => this.props.setPorts(ports), 2e3)
            } else {
                this.props.setPorts(ports)
            }
        })
        ipcRenderer.send('IPC', { type: 'sp-list' })
    }
    componentWillUnmount() {
        this.props.vm.removeListener('PROJECT_RUN_STOP', this.onProjectRunStop)
        ipcRenderer.removeAllListeners('spData')
        ipcRenderer.removeAllListeners('spError')
        ipcRenderer.removeAllListeners('spList')
    }
    nextWrite() {
        if (this.enqueue.length && this.wrote) {
            this.wrote = false
            const [data, encoding, cb] = this.enqueue.shift()
            this.st = setTimeout(() => {
                if (this.running) {
                    this.props.vm.stopAll()
                    toast('串口通信超时', { autoClose: 2e3 })
                }
            }, 5e3)
            ipcRenderer.send('IPC', { type: 'write-port', data, encoding })
            this.props.vm.once('spData', result => {
                clearTimeout(this.st)
                this.wrote = true
                if (this.running) {
                    cb(result)
                    this.nextWrite()
                }
            })
        }
    }
    onProjectRunStop() {
        this.enqueue = []
        this.wrote = true
        this.running = false
    }
    render() {
        return <span>连接</span>
    }
}

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    port: state.scratchGui.akari.port,
    ports: state.scratchGui.akari.ports,
    codePanelOpen: state.scratchGui.akari.codePanelOpen
})

const mapDispatchToProps = dispatch => ({
    setPorts: ports => dispatch(setPorts(ports)),
    setPort: port => dispatch(setPort(port))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuPort)
