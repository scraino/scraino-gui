import bindAll from 'lodash.bindall'
import React from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import ipcRenderer from '../../lib/akari'

class ItemInstall extends React.Component {
    constructor(props) {
        super(props)
        bindAll(this, ['handleHexClick', 'handlePyClick', 'handleDriverClick'])
    }

    handleHexClick() {
        if (!this.props.port) {
            toast('未连接控制器', { autoClose: 2e3 })
        } else if (this.props.board === 'ESP32') {
            toast('此控制器不能使用交互模式', { autoClose: 2e3 })
        } else {
            ipcRenderer.send('IPC', {
                type: 'upload-hex',
                com: this.props.port,
                board: this.props.board,
                noVerify: true
            })
        }
        this.props.onRequestClose()
    }

    handlePyClick() {
        if (!this.props.port) {
            toast('未连接控制器', { autoClose: 2e3 })
        } else if (this.props.board !== 'ESP32') {
            toast('此控制器不能使用MicroPython固件', { autoClose: 2e3 })
        } else {
            ipcRenderer.send('IPC', {
                type: 'upload-hex-py',
                com: this.props.port
            })
        }
        this.props.onRequestClose()
    }

    handleDriverClick() {
        ipcRenderer.send('IPC', { type: 'install-driver' })
        this.props.onRequestClose()
    }

    render() {
        const { children, className } = this.props
        return (
            <div className={className}>{children(this.handleHexClick, this.handlePyClick, this.handleDriverClick)}</div>
        )
    }
}

const mapStateToProps = state => ({
    port: state.scratchGui.akari.port,
    board: state.scratchGui.akari.board
})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemInstall)
