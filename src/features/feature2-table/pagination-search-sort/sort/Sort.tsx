import React from 'react'
import s from './Sort.module.css'

type PropsType = {
    arr: []
}

export const Sort = (props: PropsType) => {

    const handlerSortUp = () => {
        const sortUp = props.arr.sort((a, b) => a - b)
        return sortUp
    }
    const handlerSortDown = () => {
        const sortDown = props.arr.sort((a, b) => b - a)
        return sortDown
    }


    return (
        <div className={s.btns}>
            <div>
                <button className={s.up} autoFocus onClick={handlerSortUp}> ˄ </button>
            </div>
            <div>
                <button className={s.down} autoFocus onClick={handlerSortDown}> ˅ </button>
            </div>
        </div>
    )
}