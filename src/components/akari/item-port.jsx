import bindAll from 'lodash.bindall'
import React from 'react'
import { connect } from 'react-redux'

import { setPort } from '../../reducers/akari'
import ipcRenderer from '../../lib/akari'

class ItemPort extends React.Component {
    constructor(props) {
        super(props)
        bindAll(this, ['handleClick'])
    }
    handleClick(v) {
        return () => {
            if (v === '没有找到串口' || v === this.props.port) return
            this.props.vm.stopAll()
            if (v === '断开连接') {
                ipcRenderer.send('IPC', { type: 'close-port' })
                this.props.setPort(null)
            } else {
                ipcRenderer.send('IPC', { type: 'open-port', path: v, options: { baudRate: 115200 } })
                this.props.setPort(v)
            }
            this.props.onRequestClose()
        }
    }
    render() {
        const { children, ports, port } = this.props
        const _ports = [...ports]
        if (_ports.length === 0) {
            _ports.push('没有找到串口')
        } else if (port) {
            _ports.unshift('断开连接')
        }
        return children(this.handleClick, _ports, port)
    }
}

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    ports: state.scratchGui.akari.ports,
    port: state.scratchGui.akari.port
})

const mapDispatchToProps = dispatch => ({
    setPort: port => dispatch(setPort(port))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemPort)
