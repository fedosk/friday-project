import React from 'react';
import styles from './NewPassword.module.css'
import SuperInputText from "../../../../main/ui/common/c1-SuperInputText/SuperInputText";
import s from "../../../../main/ui/common/HW4.module.css";
import SuperButton from "../../../../main/ui/common/c2-SuperButton/SuperButton";
import {useParams} from "react-router-dom";
import {AppRootStateType} from "../../../../main/bll/store";
import {useDispatch, useSelector} from "react-redux";
import {setNewPassword, setPassword} from "../password-recovery-reduser";


export function NewPassword() {
    const password = useSelector((state: AppRootStateType) => state.passwordRecovery.password)
    const passwordError = password ? '' : 'password error'
    const dispatch = useDispatch();
    const {token} = useParams() as any;

    const onChangePassword = () => {
        dispatch(setPassword(password))
    }
    const onSetNewPassword = () => {
        dispatch(setNewPassword(token, password))
    }
    const showEmail = () => {
        if (passwordError) {
            alert('Неверный Адресс')
        } else {
            alert(password)
        }
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
                            value={password}
                            onChangeText={onChangePassword}
                            onEnter={showEmail}
                            error={passwordError}
                            spanClassName={s.testSpanError}
                            inputStyle
                        />
                    </div>
                    <span>Create new password and we will send you further instructions to email</span>
                    <div className={styles.createNewPasswordBtn}>
                        <SuperButton
                            color={'blue'}
                            fontColor={'white'}
                            size={'big'}
                            onClick={onSetNewPassword}
                            btn>
                            Create New Password
                        </SuperButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

