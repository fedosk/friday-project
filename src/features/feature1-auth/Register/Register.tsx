import React, {useState} from 'react';
import styles from './Register.module.css'
import SuperInputText from "../../../main/ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../main/ui/common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {sendRegisterDataTC} from "./register-reduser";
import {AppRootStateType} from "../../../main/bll/store";
import {Link, useNavigate} from "react-router-dom";
import {path} from "../../../main/ui/routes/Routes";


export function Register() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const emailError = email ? '' : 'email required'
    const passwordError = password ? '' : 'password required'
    const confirmError = confirmPassword ? '' : 'confirm password required'

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const okSignUp = useSelector<AppRootStateType, boolean>((state) => state.register.isSignUp);
    const error = useSelector<AppRootStateType, string>((state) => state.register.error)
    const errorInfo = useSelector<AppRootStateType, string>((state) => state.register.infoError)

    const onEnterPassword = () => {
        alert('подтвердите пароль!!')
    }

    const sendDataHandler = () => {
        if (password !== confirmPassword) {
            alert('неверно введен пароль подтверждения...')
        } else {
            dispatch(sendRegisterDataTC(email, password))
        }
    }

    const passwordPlace = password || confirmPassword
    const disabledBtn = passwordPlace === '';

    if (okSignUp) {
        navigate(`${path.login}`)
    }

    return (
        <div className='container'>
            <div className={styles.registerWrapper}>
                <div className={styles.registerWindow}>
                    <h1 className={styles.logo}>It-incubator</h1>
                    <h2 className={styles.signUp}>Sign Up</h2>
                    <div className={styles.emailWrapper}>
                        <SuperInputText
                            formName={'Email'}
                            type={'email'}
                            value={email}
                            onChangeText={setEmail}
                            error={error}
                            inputStyle

                        />
                    </div>
                    <div className={styles.passwordWrapper}>
                        <SuperInputText
                            className={styles.password}
                            formName={'Password'}
                            type={'password'}
                            value={password}
                            onChangeText={setPassword}
                            onEnter={onEnterPassword}
                            error={errorInfo}
                            inputStyle
                        />

                    </div>
                    <div className={styles.passwordWrapper}>
                        <SuperInputText
                            className={styles.password}
                            formName={'Confirm password'}
                            type={'password'}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            onEnter={sendDataHandler}
                            error={errorInfo}
                            inputStyle
                        />
                    </div>
                    <div className={styles.buttons}>
                        <div className={styles.cancelBtn}>
                            <Link to={path.login}>
                                <SuperButton>
                                    Cancel
                                </SuperButton>
                            </Link>
                        </div>
                        <div className={styles.registerBtn}>
                            <SuperButton
                                classBtn={'confirmBtn'}
                                onClick={sendDataHandler}
                                disabled={disabledBtn}>
                                Register
                            </SuperButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

