import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../main/bll/store";
import styles from './CardsTable.module.css'

export function CardsTable() {
    const dispatch = useDispatch()

    return (
        <div className={styles.table}>
        </div>
    );
}