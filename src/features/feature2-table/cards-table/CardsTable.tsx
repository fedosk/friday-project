import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './CardsTable.module.css'
import {
    CardPackType,
    changeSortConfig,
    changeSorting,
    deleteCardPackTC,
    FilteringType,
    getCardPacksTC,
    setNewCardPackTC,
    SortConfigType,
    SortingType,
    updateCardPackTC
} from "./cardsTable-reduser";
import {AppRootStateType} from "../../../main/bll/store";
import SuperInputText from "../../../main/ui/common/c1-SuperInputText/SuperInputText";
import {EMPTY_STRING} from "../../feature1-auth/Login/login-reduser";
import SuperButton from "../../../main/ui/common/c2-SuperButton/SuperButton";
import {dateChanger} from "../../../hooks/dateChanger/dateChanger";
import {useNavigate} from "react-router-dom";
import {Modal} from "../../../main/ui/common/Modal/Modal";


export function CardsTable() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cardsPacks = useSelector<AppRootStateType, CardPackType[]>(state => state.cardsPacks.cardPacks)
    const userId = useSelector<AppRootStateType, string>(state => state.login.userData._id)
    const filteredBy = useSelector<AppRootStateType, FilteringType>(state => state.cardsPacks.filteredBy)
    const sortConfig = useSelector<AppRootStateType, SortConfigType>(state => state.cardsPacks.sortConfig)
    const sortedBy = useSelector<AppRootStateType, SortingType>(state => state.cardsPacks.sortedBy)

    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [name, setName] = useState<string>(EMPTY_STRING)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        dispatch(getCardPacksTC())
    }, [])

    const addItemHandler = () => {
        dispatch(setNewCardPackTC(name))
        setActiveModal(false)
    }

    const onClickCardPackDelete = (id: string) => {
        dispatch(deleteCardPackTC(id))
    }

    const onClickCardPackUpdate = (id: string) => {
        dispatch(updateCardPackTC(id))
    }

    const onLearnCardClick = (_id: string, cardPackName: string) => {
        return navigate(`/cards-list/${_id}/${cardPackName}`, {replace: true})
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

    let cardPacksCopy = cardsPacks

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


    let sortBtnClass = sortConfig === 'ascending' ? `${styles.btn} ${styles.ascending}` : `${styles.btn} ${styles.descending}`

    return (
        <div className={styles.tableContainer}>
            <Modal title={'Add new pack'} activeModal={activeModal} setActiveModal={setActiveModal}>
                <SuperInputText
                    formName={error ? error : 'Name of pack'}
                    type={'email'}
                    onChangeText={setName}
                    inputStyle
                />
                <div className={styles.modalBtnsWrapper}>
                    <SuperButton
                        classBtn={'cancelBtn'}
                        onClick={() => setActiveModal(false)}>
                        Cancel
                    </SuperButton>
                    <SuperButton
                        classBtn={'confirmBtn'}
                        onClick={addItemHandler}>
                        Save
                    </SuperButton>
                </div>
            </Modal>
            <h2>Add a cards pack</h2>
            <div className={styles.addPacksFormWrapper}>
                <SuperButton
                    classBtn={'confirmBtn'}
                    // onClick={addItemHandler}>
                    onClick={() => setActiveModal(!activeModal)}>
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
                            <SuperButton
                                classBtn={'updateBtn'}
                                onClick={() => onLearnCardClick(elem._id, elem.name)}>
                                Learn
                            </SuperButton>
                            {elem.user_id === userId
                                ? <>
                                    <SuperButton
                                        classBtn={'updateBtn'}
                                        onClick={() => onClickCardPackUpdate(elem._id)}>
                                        Update
                                    </SuperButton>
                                    <SuperButton
                                        classBtn={'deleteBtn'}
                                        onClick={() => onClickCardPackDelete(elem._id)}>
                                        Delete
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