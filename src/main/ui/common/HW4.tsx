import React, {ChangeEvent, useState} from 'react'
import s from './HW4.module.css'
import SuperInputText from "./c1-SuperInputText/SuperInputText";
import SuperButton from './c2-SuperButton/SuperButton';
import SuperCheckbox from './c3-SuperCheckbox/SuperCheckbox';


export function SuperComponents() {
    const [text, setText] = useState<string>('')
    const error = text ? '' : 'error'

    const showAlert = () => {
        if (error) {
            alert('введите текст...')
        } else {
            alert(text)
        }
    }

    const [checked, setChecked] = useState<boolean>(false)
    const testOnChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked)

    return (
        <div>
            <div className={s.column}>
                <SuperInputText
                    formName={'Email'}
                    type={'email'}
                    value={text}
                    onChangeText={setText}
                    onEnter={showAlert}
                    error={error}
                    spanClassName={s.testSpanError}
                    inputStyle
                />

               {/* <SuperInputText
                    className={s.blue}
                />


                <SuperButton btn>
                    default
                </SuperButton>

                <SuperButton
                    red
                    btn
                    onClick={showAlert}
                >
                    delete
                </SuperButton>

                <SuperButton disabled>
                    disabled
                </SuperButton>

                <SuperCheckbox
                    checked={checked}
                    onChangeChecked={setChecked}
                >
                    some text
                </SuperCheckbox>

                <SuperCheckbox checked={checked} onChange={testOnChange}/>*/}
            </div>
        </div>
    )
}

