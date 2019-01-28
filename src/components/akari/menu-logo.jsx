import React from 'react'
import { ToastContainer } from 'react-toastify'

import logo from './menu-logo.png'
import styles from './menu-logo.css'

const MenuLogo = () => (
    <React.Fragment>
        <img alt="Scraino" className={styles.logo} draggable={false} src={logo} />
        <ToastContainer toastClassName={styles.toast} closeOnClick={false} autoClose={false} draggable={false} />
    </React.Fragment>
)

export default MenuLogo
