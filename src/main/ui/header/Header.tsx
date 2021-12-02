import React from 'react'
import styles from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {path} from "../routes/Routes";


export function Header() {
    return (
        <div className={styles.header}>
            <div className='container'>
                <div className={styles.headerWrapper}>
                    <NavLink to={path.login}>
                        <h1 className={styles.logo}>It-incubator</h1>
                    </NavLink>
                    <ul className={styles.list}>
                        <li className={`${styles.item} ${styles.activeItem}`}>
                            <NavLink className={styles.packList} to={path.profile}>Pack list</NavLink>
                        </li>
                        <li className={styles.item}>
                            <NavLink className={styles.profile} to={path.profile}>Profile</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


