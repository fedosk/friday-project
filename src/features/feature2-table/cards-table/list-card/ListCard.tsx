import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './ListCard.module.css'
import {
    CardsSortingType,
    CardsType,
    changeCardSortConfig,
    changeCardSorting,
    deleteCardTC, getCardListTC,
    setNewCardTC,
    updateCardTC
} from "./listCard-reduser";
import {AppRootStateType} from "../../../../main/bll/store";
import {EMPTY_STRING} from "../../../feature1-auth/Login/login-reduser";
import SuperInputText from "../../../../main/ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../main/ui/common/c2-SuperButton/SuperButton";
import {dateChanger} from "../../../../hooks/dateChanger/dateChanger";
import {SortConfigType} from "../cardsTable-reduser";
import {Link, useParams} from "react-router-dom";
import {Header} from "../../../../main/ui/header/Header";
import {path} from "../../../../main/ui/routes/Routes";


export function ListCard() {

    const dispatch = useDispatch()
    const cards = useSelector<AppRootStateType, CardsType[]>(state => state.cardsList.cardList.cards)
    const userId = useSelector<AppRootStateType, string>(state => state.login.userData._id)
    const cardPackId = useSelector<AppRootStateType, string>(state => state.cardsList.cardPackId)
    const cardsSortConfig = useSelector<AppRootStateType, SortConfigType>(state => state.cardsList.cardsSortConfig)
    const cardsSortedBy = useSelector<AppRootStateType, CardsSortingType>(state => state.cardsList.cardsSortedBy)

    const [question, setQuestion] = useState<string>(EMPTY_STRING)
    const [answer, setAnswer] = useState<string>(EMPTY_STRING)
    const grade = 0

    const cardPackIdURL = useParams().id
    const cardPackName = useParams().name

    useEffect(() => {
        cardPackIdURL && cardPackName && dispatch(getCardListTC(cardPackIdURL, cardPackName))
    }, [])

    const addCardHandler = (cardsPack_id: string, question: string, grade: number, answer: string) => {
        dispatch(setNewCardTC(cardsPack_id, question, grade, answer))
        setQuestion('');
        setAnswer('');
    }

    const onClickCardDelete = (id: string) => {
        dispatch(deleteCardTC(id))
    }

    const onClickCardUpdate = (_id: string, question: string, answerImg: string, answer: string) => {
        dispatch(updateCardTC(_id, question, answerImg, answer))
    }

    //====TABLE SORT AND FILTER====
    const onSortedByBtnClick = (sortedBy: CardsSortingType) => {
        if (cardsSortConfig === 'descending') {
            dispatch(changeCardSortConfig('ascending'))
        }
        if (cardsSortConfig === 'ascending') {
            dispatch(changeCardSortConfig('descending'))
        }
        dispatch(changeCardSorting(sortedBy))
    }

    let cardCopy = cards

    if (cardsSortedBy !== null) {
        cardCopy.sort((a, b) => {
            if (a[cardsSortedBy] < b[cardsSortedBy]) {
                return cardsSortConfig === 'ascending' ? -1 : 1
            }
            if (a[cardsSortedBy] > b[cardsSortedBy]) {
                return cardsSortConfig === 'ascending' ? 1 : -1
            }
            return 0
        })
    }
    //====TABLE SORT AND FILTER====

    let sortBtnClass = cardsSortConfig === 'ascending' ? `${styles.btn} ${styles.ascending}` : `${styles.btn} ${styles.descending}`

    return <>
        <Header/>
        <div className={styles.listCardContainer}>
            <div className={styles.listCardWrapper}>
                <div className={styles.tableWrapper}>
                    <div className={styles.titleWrapper}>
                        <Link to={path.profile}>
                            <SuperButton
                                classBtn={'btn'}>
                                <span className={styles.back}>🠔</span>
                            </SuperButton>
                        </Link>
                        <h2 className={styles.packName}>{cardPackName}</h2>
                    </div>
                    <div className={styles.addPacksFormWrapper}>
                        <SuperInputText
                            formName={'Question'}
                            type={'text'}
                            onChangeText={setQuestion}
                            inputStyle
                        />
                        <SuperInputText
                            formName={'Answer'}
                            type={'text'}
                            onChangeText={setAnswer}
                            inputStyle
                        />
                        <SuperButton
                            classBtn={'confirmBtn'}
                            onClick={() => addCardHandler(cardPackId, question, grade, answer)}>
                            Add new pack
                        </SuperButton>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th className={styles.question}>
                                <button className={cardsSortedBy === 'question' ? sortBtnClass : styles.btn}
                                        onClick={() => onSortedByBtnClick('question')}>
                                    Question
                                </button>
                            </th>
                            <th className={styles.answer}>
                                <button className={cardsSortedBy === 'answer' ? sortBtnClass : styles.btn}
                                        onClick={() => onSortedByBtnClick('answer')}>
                                    Answer
                                </button>
                            </th>
                            <th className={styles.updated}>
                                <button className={cardsSortedBy === 'updated' ? sortBtnClass : styles.btn}
                                        onClick={() => onSortedByBtnClick('updated')}>
                                    Updated
                                </button>
                            </th>
                            <th className={styles.grade}>
                                <button className={cardsSortedBy === 'grade' ? sortBtnClass : styles.btn}
                                        onClick={() => onSortedByBtnClick('grade')}>
                                    Grade
                                </button>
                            </th>
                            <th className={styles.actions}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cardCopy.reverse().map((elem: CardsType) => (
                            <tr key={`key_${elem._id}`}>
                                <td>{elem.question}</td>
                                <td>{elem.answer}</td>
                                <td>{dateChanger(elem.updated)}</td>
                                <td>{elem.grade}</td>
                                <td>
                                    {elem.user_id === userId
                                        ? <>
                                            <SuperButton
                                                classBtn={'updateBtn'}
                                                onClick={() => onClickCardUpdate(elem._id, 'Updated Question', 'https://images.app.goo.gl/2zDenkuNsWMajrZ66', 'Updated Answer')}>
                                                Update
                                            </SuperButton>
                                            <SuperButton
                                                classBtn={'deleteBtn'}
                                                onClick={() => onClickCardDelete(elem._id)}>
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
            </div>
        </div>
    </>
}