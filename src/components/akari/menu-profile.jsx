import bindAll from 'lodash.bindall'
import classNames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'

import { setAuth } from '../../reducers/akari'

import styles from './menu-profile.css'
import profileIcon from '../menu-bar/icon--profile.png'
import dropdownCaret from '../language-selector/dropdown-caret.svg'

class MenuProfile extends React.Component {
    constructor(props) {
        super(props)
        bindAll(this, ['loginClick', 'logoutClick'])
    }
    componentDidMount() {
        console.log('aaaaaaaaaaaa')
    }
    componentWillUnmount() {
        console.log('eeeeeeeeeeeee')
    }
    loginClick() {
        if (this.props.authorized) {
            this.props.onClickProfile()
        } else {
            this.props.setAuth(true)
        }
    }
    logoutClick() {
        this.props.setAuth(false)
        this.props.onRequestClose()
    }
    render() {
        const { className, children, authorized } = this.props
        return (
            <div className={className} onMouseUp={this.loginClick}>
                {authorized ? (
                    <React.Fragment>
                        <img className={styles.profileIcon} src={profileIcon} />
                        <span>{'scratch-cat' /* @todo username */}</span>
                        <img className={styles.dropdownCaretIcon} src={dropdownCaret} />
                    </React.Fragment>
                ) : (
                    <span>登录</span>
                )}
                {children(this.logoutClick)}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authorized: state.scratchGui.akari.authorized
})

const mapDispatchToProps = dispatch => ({
    setAuth: bool => dispatch(setAuth(bool))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuProfile)
