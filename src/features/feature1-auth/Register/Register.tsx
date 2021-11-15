import React, {useState} from 'react';
import styles from './Register.module.css'
import SuperInputText from "../../../main/ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../main/ui/common/c2-SuperButton/SuperButton";



export function Register() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const emailError = email ? '' : 'email required'
    const passwordError = password ? '' : 'password required'
    const confirmError = confirmPassword ? '' : 'confirm password required'

    const showEmail = () => {
        if (emailError.length) {
            alert('введите email...')
        } else {
            alert(email)
        }
    }

    const showPassword = () => {
        if (passwordError) {
            alert('введите пароль...')
        } else {
            alert(password)
        }
    }

    const showConfirmPassword = () => {
        if (passwordError) {
            alert('введите пароль повторно...')
        } else {
            alert(confirmPassword)
        }
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
                            onEnter={showEmail}
                            error={emailError}
                            spanClassName={styles.spanError}
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
                            onEnter={showPassword}
                            error={passwordError}
                            spanClassName={styles.spanError}
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
                            onEnter={showConfirmPassword}
                            error={confirmError}
                            spanClassName={styles.spanError}
                            inputStyle
                        />
                    </div>
                    <div className={styles.buttons}>
                        <div className={styles.cancelBtn}>
                            <SuperButton
                                color={'blue'}
                                fontColor={'white'}
                                size={'small'}
                                btn>
                                Cancel
                            </SuperButton>
                        </div>
                        <div className={styles.registerBtn}>
                            <SuperButton
                                color={'blue'}
                                fontColor={'white'}
                                size={'medium'}
                                btn>
                                Register
                            </SuperButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

