import bindAll from 'lodash.bindall'
import React from 'react'
import ReactTooltip from 'react-tooltip'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import { setStageSize } from '../../reducers/stage-size'
import { STAGE_SIZE_MODES } from '../../lib/layout-constants'
import ipcRenderer from '../../lib/akari'
import styles from './code-panel-action.css'

class CodePanel extends React.Component {
    constructor(props) {
        super(props)
        bindAll(this, ['handleSizeClick', 'handleUploadClick', 'handleIDEClick'])
    }
    handleSizeClick() {
        if (this.props.stageSize === STAGE_SIZE_MODES.large) {
            this.props.onSetStageSmall()
        } else {
            this.props.onSetStageLarge()
        }
    }
    handleUploadClick() {
        if (!this.props.port) {
            toast('未连接控制器', { autoClose: 2e3 })
        } else {
            if (this.props.codeType === 'python') {
                ipcRenderer.send('IPC', {
                    type: 'upload-py',
                    code: this.props.code,
                    encoding: 'utf8'
                })
            } else {
                ipcRenderer.send('IPC', {
                    type: 'upload-hex',
                    com: this.props.port,
                    board: this.props.board,
                    code: this.props.code,
                    noVerify: false
                })
            }
        }
    }
    handleIDEClick() {
        ipcRenderer.send('IPC', { type: 'open-IDE', code: this.props.code })
    }
    render() {
        return (
            <div className={styles.actions}>
                <div className={styles.action} data-tip={'改变面板大小'} onClick={this.handleSizeClick}>
                    <img src='data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNGQ5N0ZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNMTYgMUg0Yy0xLjEgMC0yIC45LTIgMnYxNGgyVjNoMTJWMXptMyA0SDhjLTEuMSAwLTIgLjktMiAydjE0YzAgMS4xLjkgMiAyIDJoMTFjMS4xIDAgMi0uOSAyLTJWN2MwLTEuMS0uOS0yLTItMnptMCAxNkg4VjdoMTF2MTR6Ii8+PC9zdmc+' />
                </div>
                <div className={styles.action} data-tip={'上传到控制器'} onClick={this.handleUploadClick}>
                    <img
                        src='data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNGQ5N0ZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPiAgICA8cGF0aCBkPSJNOSAxNmg2di02aDRsLTctNy03IDdoNHptLTQgMmgxNHYySDV6Ii8+PC9zdmc+'
                        style={{ width: 30 }}
                    />
                </div>
                {this.props.codeType === 'python' ? null : (
                    <div className={styles.action} data-tip={'打开 Arduino IDE'} onClick={this.handleIDEClick}>
                        <img
                            src='data:image/png;base64,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'
                            style={{ maxWidth: '100%' }}
                        />
                    </div>
                )}
                <ReactTooltip className={styles.tooltip} effect='solid' place='bottom' />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    code: state.scratchGui.akari.code,
    port: state.scratchGui.akari.port,
    board: state.scratchGui.akari.board
})

const mapDispatchToProps = dispatch => ({
    onSetStageLarge: () => dispatch(setStageSize(STAGE_SIZE_MODES.large)),
    onSetStageSmall: () => dispatch(setStageSize(STAGE_SIZE_MODES.small))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CodePanel)
