import React, {useState} from 'react';
import styles from './Login.module.css'
import SuperInputText from "../../../main/ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../main/ui/common/c2-SuperButton/SuperButton";
import {EMPTY_STRING, loginTC} from "./login-reduser";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../main/bll/store";
import {path} from "../../../main/ui/routes/Routes";
import {Link, Navigate} from "react-router-dom";
import SuperCheckbox from "../../../main/ui/common/c3-SuperCheckbox/SuperCheckbox";


export function Login() {
    const dispatch = useDispatch()
    const error = useSelector<AppRootStateType, string | undefined>(state => state.login.userData.error)
    const authStatus = useSelector<AppRootStateType, boolean>(state => state.login.authStatus)

    const [email, setEmail] = useState<string>(EMPTY_STRING)
    const [password, setpassword] = useState<string>(EMPTY_STRING)
    const [rememberMeStatus, setRememberMeStatus] = useState<boolean>(false)
    const emailError = email ? EMPTY_STRING : 'email error'
    const passwordError = password ? EMPTY_STRING : 'password error'

    const sendLoginRequest = (email: string, password: string, rememberMeStatus: boolean) => {
        dispatch(loginTC(email, password, rememberMeStatus))
    }

    if (authStatus) {
        return <Navigate to={path.profile}/>
    } else {
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
                            <SuperCheckbox
                                children={'Remember me'}
                                checked={rememberMeStatus}
                                onChangeChecked={setRememberMeStatus}/>
                            <Link to={path.passwordRecovery}>
                                <SuperButton>
                                    Forgot password
                                </SuperButton>
                            </Link>
                        </div>
                        <div className={styles.loginBtn}>
                            <SuperButton
                                classBtn={'confirmBtn'}
                                onClick={() => sendLoginRequest(email, password, rememberMeStatus)}>
                                Login
                            </SuperButton>
                        </div>
                        <span>Don’t have an account?</span>
                        <div className={styles.signUpBtn}>
                            <Link to={path.register}>
                                <SuperButton>
                                    Sign Up
                                </SuperButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

