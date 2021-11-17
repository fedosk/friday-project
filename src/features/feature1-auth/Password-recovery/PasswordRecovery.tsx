import React from 'react';
import styles from './PasswordRecovery.module.css'
import SuperInputText from "../../../main/ui/common/c1-SuperInputText/SuperInputText";
import s from "../../../main/ui/common/HW4.module.css";
import SuperButton from "../../../main/ui/common/c2-SuperButton/SuperButton";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../main/bll/store";
import {sendInstructions, setEmail} from "./password-recovery-reduser";
import {usePasswordRecoveryHandler} from "../../../hooks/passwordRecoveryHandler/passwordRecoveryHandler";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../../main/ui/routes/Routes";


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
        navigate(`${PATH.CHECK_EMAIL}`)
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
                            onChangeText={onEmailChange}
                            onEnter={showEmail}
                            error={emailError}
                            spanClassName={s.testSpanError}
                            inputStyle
                        />
                    </div>
                    <span>Enter your email address and we will send you further instructions </span>
                    <div className={styles.sendInstructionsBtn}>
                        <SuperButton
                            color={'blue'}
                            fontColor={'white'}
                            size={'big'}
                            btn
                            onClick={onClick}
                        >
                            Send Instructions
                        </SuperButton>
                    </div>
                    <span>Did you remember your password?</span>
                    <div className={styles.tryLoginBtn}>
                        <SuperButton
                            fontColor={'#21268F'}
                            fontSize={'big'}
                            size={'small'}>
                            Try logging in
                        </SuperButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

