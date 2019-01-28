import ScratchBlocks from 'scratch-blocks'
import classNames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light'
import arduino from 'react-syntax-highlighter/languages/prism/arduino'
import python from 'react-syntax-highlighter/languages/prism/python'
import arduinoLight from 'react-syntax-highlighter/styles/prism/prism'

import CodePanelACtion from './code-panel-action.jsx'
import { setCode, setCodeType } from '../../reducers/akari'
import styles from './code-panel.css'

class CodePanel extends React.Component {
    constructor(props) {
        super(props)
        this.toCode = this.toCode.bind(this)
        this.extensionSelected = this.extensionSelected.bind(this)
    }
    componentDidMount() {
        this.workspace = ScratchBlocks.getMainWorkspace()
        this.listenFunc = this.workspace.addChangeListener(this.toCode)
        window.addEventListener('akari_extensionSelected', this.extensionSelected)
        this.toCode()
    }
    componentWillUnmount() {
        this.workspace.removeChangeListener(this.listenFunc)
        window.removeEventListener('akari_extensionSelected', this.extensionSelected)
    }
    extensionSelected(e) {
        if (e.detail.peripheral) {
            this.toCode()
        }
    }
    toCode() {
        let code
        if (
            this.props.vm.runtime.loadingExtensionIds.includes('pyesp32') ||
            this.props.vm.runtime.loadingExtensionIds.includes('epython')
        ) {
            code = ScratchBlocks.Python.workspaceToCode(this.workspace)
            registerLanguage('python', python)
            this.props.setCodeType('python')
        } else {
            const blocks = this.workspace.getTopBlocks()
            code = this.props.vm.runtime.codeGenerator.toCode(blocks)
            registerLanguage('arduino', arduino)
            this.props.setCodeType('arduino')
        }
        this.props.setCode(code)
    }
    render() {
        const { code, stageSize } = this.props
        return (
            <div className={classNames(styles.wrapper, styles[stageSize])}>
                <CodePanelACtion stageSize={stageSize} codeType={this.props.codeType} />
                <div className={styles.code}>
                    <SyntaxHighlighter
                        language={this.props.codeType}
                        customStyle={{ width: '100%', height: '100%', background: 'none', margin: 0 }}
                        lineNumberContainerStyle={{ float: 'left', paddingRight: 10, userSelect: 'none' }}
                        style={arduinoLight}
                        showLineNumbers={true}
                    >
                        {this.props.codeType === 'python'
                            ? '# Language: Python3\n' + code
                            : '// Language: Arduino\n' + code}
                    </SyntaxHighlighter>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    code: state.scratchGui.akari.code,
    codeType: state.scratchGui.akari.codeType
})

const mapDispatchToProps = dispatch => ({
    setCode: code => dispatch(setCode(code)),
    setCodeType: type => dispatch(setCodeType(type))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CodePanel)
