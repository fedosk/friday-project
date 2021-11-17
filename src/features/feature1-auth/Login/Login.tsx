import React, {useState} from 'react';
import styles from './Login.module.css'
import s from "../../../main/ui/common/HW4.module.css";
import SuperInputText from "../../../main/ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../main/ui/common/c2-SuperButton/SuperButton";
import {EMPTY_STRING, FAILED, loginTC, RequestStatusType, SUCCEEDED} from "./login-reduser";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../main/bll/store";
import {PATH} from "../../../main/ui/routes/Routes";
import {Navigate} from "react-router-dom";


export function Login() {
    const [email, setEmail] = useState<string>(EMPTY_STRING)
    const [password, setpassword] = useState<string>(EMPTY_STRING)
    const emailError = email ? EMPTY_STRING : 'email error'
    const passwordError = password ? EMPTY_STRING : 'password error'

    const dispatch = useDispatch()
    const authStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.login.status)

    function sendLoginRequest(email: string, password: string) {
        dispatch(loginTC(email, password))
    }

    if (authStatus === SUCCEEDED) {
        return <Navigate to={PATH.PROFILE}/>
    }
    if (authStatus === FAILED) {
        return <Navigate to={PATH.ERROR404}/>
    }

    return (
        <div className='container'>
            <div className={styles.loginWrapper}>
                <div className={styles.loginWindow}>
                    <h1 className={styles.logo}>It-incubator</h1>
                    <h2 className={styles.signIn}>Sign In</h2>
                    <div className={styles.emailWrapper}>
                        <SuperInputText
                            formName={'Email'}
                            type={'email'}
                            value={email}
                            onChangeText={setEmail}
                            error={emailError}
                            spanClassName={s.testSpanError}
                            inputStyle
                        />
                    </div>
                    <div className={styles.passwordWrapper}>
                        <SuperInputText
                            className={styles.password}
                            formName={'Password'}
                            type={'password'}
                            value={password}
                            onChangeText={setpassword}
                            error={passwordError}
                            spanClassName={s.testSpanError}
                            inputStyle
                        />
                    </div>
                    <div className={styles.forgotPasswordBtn}>
                        <SuperButton
                            fontSize={'medium'}
                            size={'medium'}>
                            Forgot password
                        </SuperButton>
                    </div>
                    <div className={styles.loginBtn}>
                        <SuperButton
                            color={'blue'}
                            fontColor={'white'}
                            size={'big'}
                            onClick={() => sendLoginRequest(email, password)}
                            btn>
                            Login
                        </SuperButton>
                    </div>
                    <span>Don’t have an account?</span>
                    <div className={styles.signUpBtn}>
                        <SuperButton
                            fontColor={'#21268F'}
                            fontSize={'big'}
                            size={'small'}>
                            Sign Up
                        </SuperButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

