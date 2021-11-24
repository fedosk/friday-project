import React from 'react'
import styles from './MainPage.module.css'
import {Login} from "../../feature1-auth/Login/Login";


export function MainPage() {

    return (

        <div className={styles.mainPage}>
            <div className='container'>
                <Login/>
            </div>

        </div>

    )
}