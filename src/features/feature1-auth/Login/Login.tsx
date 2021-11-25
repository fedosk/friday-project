import React, {useState} from 'react';
import styles from './Login.module.css'
import SuperInputText from "../../../main/ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../main/ui/common/c2-SuperButton/SuperButton";
import {EMPTY_STRING, FAILED, loginTC, RequestStatusType, SUCCEEDED} from "./login-reduser";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../main/bll/store";
import {path} from "../../../main/ui/routes/Routes";
import {Link, Navigate} from "react-router-dom";


export function Login() {
    const [email, setEmail] = useState<string>(EMPTY_STRING)
    const [password, setpassword] = useState<string>(EMPTY_STRING)
    const emailError = email ? EMPTY_STRING : 'email error'
    const passwordError = password ? EMPTY_STRING : 'password error'

    const dispatch = useDispatch()
    const authStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.login.status)
    const error = useSelector<AppRootStateType, string | undefined>(state => state.login.userData.error)

    function sendLoginRequest(email: string, password: string) {
        dispatch(loginTC(email, password))
    }

    if (authStatus === SUCCEEDED) {
        return <Navigate to={path.profile}/>
    }

    if (authStatus === FAILED) {
        return <Navigate to={path.error}/>
    }

    return (
        <div className='container'>
            <div className={styles.loginWrapper}>
                <div className={styles.loginWindow}>
                    <h1 className={styles.logo}>It-incubator</h1>
                    {error
                        ? <h2 className={styles.signIn}>{error}</h2>
                        : <h2 className={styles.signIn}>Sign In</h2>
                    }
                    <div className={styles.emailWrapper}>
                        <SuperInputText
                            formName={'Email'}
                            type={'email'}
                            value={email}
                            onChangeText={setEmail}
                            error={emailError}
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
                            inputStyle
                        />
                    </div>
                    <div className={styles.forgotPasswordBtn}>
                        <Link to={path.passwordRecovery}>
                            <SuperButton
                                fontSize={'medium'}
                                size={'medium'}>
                                Forgot password
                            </SuperButton>
                        </Link>
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
                        <Link to={path.register}>
                            <SuperButton
                                fontColor={'#21268F'}
                                fontSize={'big'}
                                size={'small'}
                                btn>
                                Sign Up
                            </SuperButton>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

