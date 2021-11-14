import React from 'react'
import styles from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {PATH} from "../routes/Routes";


export function Header() {
    return (
        <div className={styles.header}>
            <div className='container'>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <NavLink to={PATH.LOGIN}><h1 className={styles.logo}>It-incubator</h1></NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to={PATH.LOGIN}>LOGIN</NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to={PATH.NEW_PASSWORD}>NEW PASSWORD</NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to={PATH.PASSWORD_RECOVERY}>PASSWORD RECOVERY</NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to={PATH.PROFILE}>PROFILE</NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to={PATH.REGISTER}>REGISTER</NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to={PATH.SUPER_COMPONENTS}>SUPER COMPONENTS</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}


