import React from 'react'
import styles from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {path} from "../App";


export function Header() {

    return (
        <div className={styles.header}>
            <div className='container'>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <NavLink to={path.main}><h1
                            className={styles.logo}>It-incubator</h1></NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to={path.packs}>Packs List</NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink to={path.profile}>PROFILE</NavLink>
                    </li>
                </ul>
            </div>

        </div>
    )
}


