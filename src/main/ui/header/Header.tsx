import React from 'react'
import styles from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {path} from "../routes/Routes";


export function Header() {
    return (
        <div className={styles.header}>
            <div className='container'>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <NavLink to={path.login}>
                            <h1 className={styles.logo}>It-incubator</h1>
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to={path.newPassword}>NEW PASSWORD</NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to={path.passwordRecovery}>PASSWORD RECOVERY</NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to={path.profile}>PROFILE</NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to={path.register}>REGISTER</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}


