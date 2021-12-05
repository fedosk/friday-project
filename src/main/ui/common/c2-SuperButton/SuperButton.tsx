import React, {ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent} from 'react'
import s from './SuperButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    btn?: boolean
    onClick?: () => void
    classBtn?: string
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        className, btn,
        color,
        onClick, classBtn,
        ...restProps
    }
) => {

    const onClickCallback = (e: MouseEvent<HTMLButtonElement>) => {
        onClick && onClick(e)
    }

    let btnClassName
    if (classBtn === 'btn') {
        btnClassName = s.btn
    }
    if (classBtn === 'deleteBtn') {
        btnClassName = `${s.btn} ${s.deleteBtn}`
    }
    if (classBtn === 'updateBtn') {
        btnClassName = `${s.btn} ${s.updateBtn}`
    }
    if (classBtn === 'confirmBtn') {
        btnClassName = `${s.btn} ${s.confirmBtn}`
    }
    if (classBtn === 'cancelBtn') {
        btnClassName = `${s.btn} ${s.cancelBtn}`
    }
    if (classBtn === 'deleteBtn') {
        btnClassName = `${s.btn} ${s.deleteBtn}`
    }
    if (classBtn === 'bigDeleteBtn') {
        btnClassName = `${s.btn} ${s.bigDeleteBtn}`
    }
    if (classBtn === 'filteMyBtn') {
        btnClassName = `${s.btn} ${s.filteMyBtn}`
    }
    if (classBtn === 'filterAllBtn') {
        btnClassName = `${s.btn} ${s.filterAllBtn}`
    }
    if (classBtn === 'filterMyBtnActive') {
        btnClassName = `${s.btn} ${s.filterMyBtnActive}`
    }
    if (classBtn === 'filterAllBtnActive') {
        btnClassName = `${s.btn} ${s.filterAllBtnActive}`
    }

    return (
        <button
            onClick={onClickCallback}
            className={btnClassName}
            {...restProps}
        />
    )
}

export default SuperButton
