import React from 'react';
import styles from './NewPassword.module.css'
import SuperInputText from "../../../../main/ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../main/ui/common/c2-SuperButton/SuperButton";
import {useNavigate, useParams} from "react-router-dom";
import {AppRootStateType} from "../../../../main/bll/store";
import {useSelector} from "react-redux";
import {useNewPasswordHandler} from "../../../../hooks/newPasswordHandler/newPasswordHandler";
import {path} from "../../../../main/ui/routes/Routes";
import {sendNewPassword, setNewPassword} from "../password-recovery-reduser";


export function NewPassword() {
    const newPassword = useSelector((state: AppRootStateType) => state.passwordRecovery.newPassword)
    const isSending = useSelector((state: AppRootStateType) => state.passwordRecovery.isSending)
    const {token} = useParams() as { token: string; }
    let navigate = useNavigate();
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
        navigate(`${path.login}`)
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
                            inputStyle
                        />
                    </div>
                    <span className={styles.title}>Create new password and we will send you further instructions to email</span>
                    <div className={styles.createNewPasswordBtn}>
                        <SuperButton
                            classBtn={'confirmBtn'}
                            onClick={onClick}>
                            Create New Password
                        </SuperButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

