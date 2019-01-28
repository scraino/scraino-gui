import bindAll from 'lodash.bindall'
import React from 'react'
import { connect } from 'react-redux'

import { setAboutMenu } from '../../reducers/akari'
import { openAkariHelp } from '../../reducers/modals'
import ipcRenderer from '../../lib/akari'

class MenuHelp extends React.Component {
    constructor(props) {
        super(props)
        bindAll(this, ['docClick', 'desClick', 'aboutClick'])
    }

    componentDidMount() {
        ipcRenderer.once('first-open', (_, version) => {
            if (version !== window.localStorage.getItem('version')) {
                window.localStorage.setItem('version', version)
                this.props.setAboutMenu(false)
                this.props.openAkariHelp()
            }
        })
    }

    componentWillUnmount() {
        ipcRenderer.removeAllListeners('first-open')
    }

    docClick() {
        this.props.onRequestClose()
        ipcRenderer.send('IPC', { type: 'open-doc' })
    }

    desClick() {
        this.props.onRequestClose()
        this.props.setAboutMenu(false)
        this.props.openAkariHelp()
    }

    aboutClick() {
        this.props.onRequestClose()
        this.props.setAboutMenu(true)
        this.props.openAkariHelp()
    }

    render() {
        const { className, onClickHelp, children } = this.props
        return (
            <div className={className} onMouseUp={onClickHelp}>
                <span>帮助</span>
                {children(this.docClick, this.desClick, this.aboutClick)}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setAboutMenu: bool => dispatch(setAboutMenu(bool)),
    openAkariHelp: () => dispatch(openAkariHelp())
})

export default connect(
    () => ({}),
    mapDispatchToProps
)(MenuHelp)
