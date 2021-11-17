import React from 'react';
import styles from './CheckEmail.module.css'
import checkEmail from '../../../../main/ui/assets/img/icons/checkEmail.svg'

export function CheckEmail() {


    return (
        <div className='container'>
            <div className={styles.checkEmail}>
                <div className={styles.checkEmailWindow}>
                    <h1 className={styles.logo}>It-incubator</h1>
                    <div className={styles.checkEmailWrapper}>
                        <div className={styles.checkEmailImg}>
                            <img src={checkEmail}/>
                        </div>
                        <h2>Check Email</h2>
                    </div>
                    <span> We’ve sent an Email with instructions to example@mail.com</span>
                </div>
            </div>
        </div>
    );
}

