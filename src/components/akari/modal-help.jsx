import React from 'react'

import Modal from '../modal/modal.jsx'

import styles from './modal-help.css'

const ModalHelp = ({ isAboutMenu, onRequestClose }) => (
    <Modal
        className={styles.modalContent}
        contentLabel={isAboutMenu ? '关于' : '发行说明'}
        onRequestClose={onRequestClose}
    >
        {isAboutMenu ? (
            <div className={styles.aboutBody}>
                Scraino是一款基于Scratch3.0开发的图形化编程平台，不仅保留了Scratch的原生形态，同时添加了对Arduino、Raspberry
                Pi、Microbit等智能硬件的支持，不仅可以实现软件与硬件的交互设计，还可以将代码烧录到控制器中，实现智能项目的开发，以及构建小型物联网系统，给用户带来多维的体验方式。
                <br />
                <br />
                Copyright © 2018 Scraino Team
            </div>
        ) : (
            <div className={styles.desBody}>
                <p>当前版本：{window.localStorage.getItem('version')}</p>
                <p>更新内容：</p>
                <ol>
                    <li>修改ESP32扩展接口</li>
                    <li>添加EDO-Robot-B扩展</li>
                    <li>添加扩展示例</li>
                </ol>
            </div>
        )}
    </Modal>
)

export default ModalHelp
