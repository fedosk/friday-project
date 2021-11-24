import React from 'react';
import styles from './NewPassword.module.css'
import SuperInputText from "../../../main/ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../main/ui/common/c2-SuperButton/SuperButton";
import {Navigate, useParams} from "react-router-dom";
import {AppRootStateType} from "../../../main/bll/store";
import {useSelector} from "react-redux";
import {useNewPasswordHandler} from "../../../hooks/newPasswordHandler/newPasswordHandler";

import {
    sendNewPassword,
    setNewPassword
} from "../Password-recovery/password-recovery-reduser";
import {path} from "../../../main/ui/App";


export function NewPassword() {
    const newPassword = useSelector((state: AppRootStateType) => state.passwordRecovery.newPassword)
    const isSending = useSelector((state: AppRootStateType) => state.passwordRecovery.isSending)
    const {token} = useParams() as { token: string; }

    const {
        onChange,
        onClick,
        newPasswordError
    } = useNewPasswordHandler({
        action: setNewPassword,
        thunk: sendNewPassword,
        newPassword,
        token
    })
    if (isSending) {
        return <Navigate to={path.login}/>
    }

    return (
        <div className='container'>
            <div className={styles.newPassword}>
                <div className={styles.newPasswordWindow}>
                    <h1 className={styles.logo}>It-incubator</h1>
                    <h2 className={styles.createNewPassword}>Create New Password</h2>
                    <div className={styles.newPasswordWrapper}>
                        <SuperInputText
                            formName={'Password'}
                            type={'password'}
                            value={newPassword}
                            onChangeText={onChange}
                            onEnter={onClick}
                            error={newPasswordError}
                            spanClassName={styles.testSpanError}
                            inputStyle
                        />
                    </div>
                    <span>Create new password and we will send you further instructions to email</span>
                    <div className={styles.createNewPasswordBtn}>
                        <SuperButton
                            color={'blue'}
                            fontColor={'white'}
                            size={'big'}
                            onClick={onClick}
                            btn>
                            Create New Password
                        </SuperButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

