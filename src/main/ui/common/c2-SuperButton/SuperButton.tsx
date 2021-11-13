import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    btn?: boolean
    color?: string
    fontColor?: string
    size?: string
    fontSize?: string
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className, btn,
        color,fontColor,
        size,fontSize,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {

    let btnFontColor = 'black'
    let btnSize = '140px'
    let btnFontSize = '14px'

    if(fontColor) {
        btnFontColor = fontColor
    }

    if(size) {
        if (size === 'big') {
            btnSize = '270px'
        }
        if (size === 'medium') {
            btnSize = '185px'
        }
        if (size === 'small') {
            btnSize = '125px'
        }
    }

    if(fontSize) {
        if (size === 'bigFont') {
            btnFontSize = '16px'
        }
        if (size === 'mediumFont') {
            btnFontSize = '14px'
        }
        if (size === 'smallFont') {
            btnFontSize = '12px'
        }
    }

    const blueBtnClassName = `${color === 'blue' ? s.blueButton : s.default} ${className}`
    const btnClassName = `${btn ? s.btn : s.default} ${className}`

    return (
        <button
            className={`${btnClassName} ${blueBtnClassName}`}
            style={{ width: `${btnSize}`, fontSize: `${btnFontSize}`, color: `${btnFontColor}`}}
            {...restProps}
        />
    )
}

export default SuperButton
