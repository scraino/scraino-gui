import bindAll from 'lodash.bindall'
import React from 'react'

import Modal from '../modal/modal.jsx'

import styles from './modal-save.css'

class ModalSave extends React.Component {
    constructor(props) {
        super(props)
        bindAll(this, ['handleClick'])
    }
    handleClick(num) {
        return () => {
            this.props.onRequestClose()
            window.dispatchEvent(new CustomEvent('modal-save', { detail: { num } }))
        }
    }
    render() {
        return (
            <Modal className={styles.modalContent} contentLabel="保存" onRequestClose={this.handleClick(-1)}>
                <div className={styles.body}>
                    <div className={styles.des}>
                        <p>是否保存当前项目?</p>
                    </div>
                    <div className={styles.buttonRow}>
                        <button className={styles.cancelButton} onClick={this.handleClick(0)}>
                            不保存
                        </button>
                        <button className={styles.okButton} onClick={this.handleClick(1)}>
                            保存
                        </button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default ModalSave
