import React from 'react';
import styles from './PasswordRecovery.module.css'
import SuperInputText from "../../../main/ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../main/ui/common/c2-SuperButton/SuperButton";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../main/bll/store";
import {sendInstructions, setEmail} from "./password-recovery-reduser";
import {usePasswordRecoveryHandler} from "../../../hooks/passwordRecoveryHandler/passwordRecoveryHandler";
import {Link, useNavigate} from "react-router-dom";
import {path} from "../../../main/ui/routes/Routes";


export function PasswordRecovery() {
    const email = useSelector((state: AppRootStateType) => state.passwordRecovery.email)
    const isSending = useSelector((state: AppRootStateType) => state.passwordRecovery.isSending)
    let navigate = useNavigate();
    const {
        onChange,
        onClick,
        emailError
    } = usePasswordRecoveryHandler({action: setEmail, thunk: sendInstructions, email});

    if (isSending) {
        navigate(`${path.checkEmail}`)
    }
    const showEmail = () => {
        if (emailError) {
            alert('Неверный Адрес')
        } else {
            alert(email)
        }
    }

    return (
        <div className='container'>
            <div className={styles.passwordRecovery}>
                <div className={styles.passwordRecoveryWindow}>
                    <h1 className={styles.logo}>It-incubator</h1>
                    <h2 className={styles.forgotYourPassword}>Forgot your password ?</h2>
                    <div className={styles.emailWrapper}>
                        <SuperInputText
                            formName={'Email'}
                            type={'email'}
                            value={email}
                            onChangeText={onChange}
                            onEnter={showEmail}
                            error={emailError}
                            inputStyle
                        />
                    </div>
                    <span>Enter your email address and we will send you further instructions </span>
                    <div className={styles.sendInstructionsBtn}>
                        <SuperButton
                            classBtn={'confirmBtn'}
                            onClick={onClick}>
                            Send Instructions
                        </SuperButton>
                    </div>
                    <span className={styles.title}>Did you remember your password?</span>
                    <div className={styles.tryLoginBtn}>
                        <Link to={path.login}>
                            <SuperButton>
                                Try logging in
                            </SuperButton>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

