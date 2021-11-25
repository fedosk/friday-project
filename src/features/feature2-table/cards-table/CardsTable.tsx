import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './CardsTable.module.css'
import {CardPackType, getCardPacksTC} from "./cardsTable-reduser";
import {AppRootStateType} from "../../../main/bll/store";

export function CardsTable() {
    const dispatch = useDispatch()
    const cardsPacks = useSelector<AppRootStateType, CardPackType[]>(state => state.cardsPacks.cardPacks)

    useEffect(() => {
        dispatch(getCardPacksTC())
    }, [])

    return (
        <div className={styles.tableContainer}>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Cards</th>
                    <th>Last Updated</th>
                    <th>Created by</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Eduard</td>
                    <td>111</td>
                    <td>12.11.2020</td>
                    <td>Eduard</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}