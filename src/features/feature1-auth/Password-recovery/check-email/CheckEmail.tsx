import React from 'react';
import styles from './CheckEmail.module.css'
import checkEmail from '../../../../main/ui/assets/img/icons/checkEmail.svg'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../main/bll/store";


export const CheckEmail = () => {
    const email = useSelector((state: AppRootStateType) => state.passwordRecovery.email)

    return (
        <div className='container'>
            <div className={styles.checkEmail}>
                <div className={styles.checkEmailWindow}>
                    <h1 className={styles.logo}>It-incubator</h1>
                    <div className={styles.checkEmailWrapper}>
                        <div className={styles.checkEmailImg}>
                            <img src={checkEmail} alt={'checkEmail'}/>
                        </div>
                        <h2>Check Email</h2>
                    </div>
                    <span className={styles.title}> We’ve sent an Email with instructions to {email}</span>
                </div>
            </div>
        </div>
    );
}

