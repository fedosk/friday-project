import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './CardsTable.module.css'
import {
    CardPackType, changeSortConfig, changeSorting,
    deleteCardPackTC,
    FilteringType,
    getCardPacksTC,
    setNewCardPackTC, setSearch, SortConfigType, SortingType,
    updateCardPackTC
} from "./cardsTable-reduser";
import {AppRootStateType} from "../../../main/bll/store";
import SuperInputText from "../../../main/ui/common/c1-SuperInputText/SuperInputText";
import {EMPTY_STRING} from "../../feature1-auth/Login/login-reduser";
import SuperButton from "../../../main/ui/common/c2-SuperButton/SuperButton";

export const dateChanger = (date: string) => {
    let changedDate = new Date(Date.parse(date))
    const checkingDate = (d: number) => {
        return d >= 10 ? d : `0${d}`
    }
    let day = checkingDate(changedDate.getDay())
    let month = checkingDate(changedDate.getMonth())
    let year = checkingDate(changedDate.getFullYear())
    let hours = checkingDate(changedDate.getHours())
    let minutes = checkingDate(changedDate.getMinutes())
    return `${day}.${month}.${year} in ${hours}:${minutes}`

}

export function CardsTable() {
    const dispatch = useDispatch()
    const cardsPacks = useSelector<AppRootStateType, CardPackType[]>(state => state.cardsPacks.cardPacks)
    const userId = useSelector<AppRootStateType, string>(state => state.login.userData._id)
    const filteredBy = useSelector<AppRootStateType, FilteringType>(state => state.cardsPacks.filteredBy)
    const sortConfig = useSelector<AppRootStateType, SortConfigType>(state => state.cardsPacks.sortConfig)
    const sortedBy = useSelector<AppRootStateType, SortingType>(state => state.cardsPacks.sortedBy)

    const [name, setName] = useState<string>(EMPTY_STRING)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        dispatch(getCardPacksTC())
    }, [])

    const addItemHandler = () => {
        if (name.trim() !== '') {
            dispatch(setNewCardPackTC(name))
            setName('');
        } else {
            setError('Name is required');
        }
    }

    const onClickCardPackDelete = (id: string) => {
        dispatch(deleteCardPackTC(id))
    }

    const onClickCardPackUpdate = (id: string) => {
        dispatch(updateCardPackTC(id))
    }

    //====TABLE SORT AND FILTER====
    const onSortedByBtnClick = (sortedBy: SortingType) => {
        if (sortConfig === 'descending') {
            dispatch(changeSortConfig('ascending'))
        }
        if (sortConfig === 'ascending') {
            dispatch(changeSortConfig('descending'))
        }
        dispatch(changeSorting(sortedBy))
    }

    let cardPacksCopy = [...cardsPacks]

    if (filteredBy === 'my') {
        cardPacksCopy = cardPacksCopy.filter(pack => filteredBy === 'my' && pack.user_id === userId)
    }

    if (sortedBy !== null) {
        cardPacksCopy.sort((a, b) => {
            if (a[sortedBy] < b[sortedBy]) {
                return sortConfig === 'ascending' ? -1 : 1
            }
            if (a[sortedBy] > b[sortedBy]) {
                return sortConfig === 'ascending' ? 1 : -1
            }
            return 0
        })
    }
    //====TABLE SORT AND FILTER====

    let sortBtnClass = sortConfig === 'ascending' ?  `${styles.btn} ${styles.ascending}` : `${styles.btn} ${styles.descending}`

    //====SEARCH====

    const searchHandler = () => {
        const filteredCardPacks = cardPacksCopy.filter(p => {
            return p.name.toLowerCase().includes(name.toLowerCase())
        })
        dispatch(setSearch(filteredCardPacks))
    }

    return (
        <div className={styles.tableContainer}>
            <h2>Add a cards pack</h2>
            <div className={styles.addPacksFormWrapper}>
                <SuperInputText
                    formName={error ? error : 'Name of pack'}
                    type={'email'}
                    onChangeText={setName}
                    inputStyle
                />
                <div>
                    <SuperButton
                        classBtn={'confirmBtn'}
                        onClick={searchHandler}>
                        Search
                    </SuperButton>
                </div>
                <SuperButton
                    classBtn={'confirmBtn'}
                    onClick={addItemHandler}>
                    Add new pack
                </SuperButton>
            </div>
            <table>
                <thead>
                <tr>
                    <th className={styles.name}>
                        <button className={sortedBy === 'name' ? sortBtnClass : styles.btn}
                                onClick={() => onSortedByBtnClick('name')}>
                            Pack Name
                        </button>
                    </th>
                    <th className={styles.cardsCount}>
                        <button className={sortedBy === 'cardsCount' ? sortBtnClass : styles.btn}
                                onClick={() => onSortedByBtnClick('cardsCount')}>
                            Cards
                        </button>
                    </th>
                    <th className={styles.updated}>
                        <button className={sortedBy === 'updated' ? sortBtnClass : styles.btn}
                                onClick={() => onSortedByBtnClick('updated')}>
                            Last Updated
                        </button>
                    </th>
                    <th className={styles.user_name}>
                        <button className={sortedBy === 'user_name' ? sortBtnClass : styles.btn}
                                onClick={() => onSortedByBtnClick('user_name')}>
                            Created by
                        </button>
                    </th>
                    <th className={styles.actions}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cardPacksCopy.reverse().map((elem: CardPackType) => (
                    <tr key={`key_${elem._id}`}>
                        <td>{elem.name}</td>
                        <td>{elem.cardsCount}</td>
                        <td>{dateChanger(elem.updated)}</td>
                        <td>{elem.user_name}</td>
                        <td>
                            {elem.user_id === userId
                                ? <>
                                    <SuperButton
                                        classBtn={'deleteBtn'}
                                        onClick={() => onClickCardPackDelete(elem._id)}>
                                        delete
                                    </SuperButton>
                                    <SuperButton
                                        classBtn={'updateBtn'}
                                        onClick={() => onClickCardPackUpdate(elem._id)}>
                                        update
                                    </SuperButton>
                                </>
                                : <div/>}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}