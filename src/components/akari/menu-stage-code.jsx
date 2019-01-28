import bindAll from 'lodash.bindall'
import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import { setCodePanel } from '../../reducers/akari'
import { updateToolbox } from '../../reducers/toolbox'
import makeToolboxXML from '../../lib/make-toolbox-xml'

import styles from './menu-stage-code.css'

class MenuStageCode extends React.Component {
    constructor(props) {
        super(props)
        bindAll(this, ['handleClick'])
    }
    handleClick() {
        this.props.setCodePanel(!this.props.codePanelOpen)
        if (this.props.vm.editingTarget) {
            const target = this.props.vm.editingTarget
            const dynamicBlocksXML = this.props.vm.runtime.getBlocksXML()
            const toolboxXML = makeToolboxXML(target.isStage, target.id, dynamicBlocksXML, !this.props.codePanelOpen)
            this.props.updateToolbox(toolboxXML)
        }
    }
    render() {
        const { codePanelOpen } = this.props
        return (
            <div className={styles.wrapper} onClick={this.handleClick}>
                <div className={styles.textWrapper}>
                    <div
                        className={classNames(styles.text, {
                            [styles.textShow]: !codePanelOpen,
                            [styles.textHidden]: codePanelOpen
                        })}
                    >
                        舞台
                    </div>
                    <div
                        className={classNames(styles.text, {
                            [styles.textShow]: codePanelOpen,
                            [styles.textHidden]: !codePanelOpen
                        })}
                    >
                        代码
                    </div>
                </div>
                <div className={styles.switchWrapper}>
                    <div
                        className={classNames(styles.switch, {
                            [styles.switchLeft]: codePanelOpen,
                            [styles.switchRight]: !codePanelOpen
                        })}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    vm: state.scratchGui.vm,
    codePanelOpen: state.scratchGui.akari.codePanelOpen
})

const mapDispatchToProps = dispatch => ({
    setCodePanel: bool => dispatch(setCodePanel(bool)),
    updateToolbox: xml => dispatch(updateToolbox(xml))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuStageCode)
