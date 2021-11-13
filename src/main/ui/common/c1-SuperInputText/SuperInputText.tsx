import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import s from './SuperInputText.module.css'


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    inputStyle?: boolean
    formName?: string
}

const SuperInputText: React.FC<SuperInputTextPropsType> = (
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName, inputStyle,
        formName,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter
        && e.key === 'Enter'
        && onEnter()
    }

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${s.errorInput} ${className}`
    const InputStyleClassName = inputStyle ? s.inputStyle : ''
    return (
        <div className={s.inputWrapper}>
            {error
                ? <label className={finalSpanClassName} htmlFor={type}>{error}</label>
                : <label className={s.label} htmlFor={type}>{formName}</label>
            }
            <input
                id={type}
                type={type}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={`${finalInputClassName} ${InputStyleClassName}`}
                {...restProps}
            />
        </div>
    )
}

export default SuperInputText
