import React, {useState} from 'react';
import styles from './Login.module.css'
import s from "../../../main/ui/common/HW4.module.css";
import SuperInputText from "../../../main/ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../main/ui/common/c2-SuperButton/SuperButton";


export function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setpassword] = useState<string>('')
    const emailError = email ? '' : 'email error'
    const passwordError = password ? '' : 'password error'

    const showEmail = () => {
        if (emailError) {
            alert('введите текст...')
        } else {
            alert(email)
        }
    }

    const showPassword = () => {
        if (passwordError) {
            alert('введите текст...')
        } else {
            alert(password)
        }
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
                            onEnter={showEmail}
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
                            onEnter={showPassword}
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

