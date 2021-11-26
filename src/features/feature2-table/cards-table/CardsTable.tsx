import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './CardsTable.module.css'
import {CardPackType, deleteCardPackTC, getCardPacksTC, setNewCardPackTC} from "./cardsTable-reduser";
import {AppRootStateType} from "../../../main/bll/store";
import SuperInputText from "../../../main/ui/common/c1-SuperInputText/SuperInputText";
import {EMPTY_STRING} from "../../feature1-auth/Login/login-reduser";
import SuperButton from "../../../main/ui/common/c2-SuperButton/SuperButton";

export function CardsTable() {
    const [name, setName] = useState<string>(EMPTY_STRING)
    let [error, setError] = useState<string | null>(null)

    const dispatch = useDispatch()
    const cardsPacks = useSelector<AppRootStateType, CardPackType[]>(state => state.cardsPacks.cardPacks)

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
        debugger
        dispatch(deleteCardPackTC(id))
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
                <SuperButton
                    color={'blue'}
                    fontColor={'white'}
                    size={'big'}
                    onClick={addItemHandler}
                    btn>
                    Add new pack
                </SuperButton>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Pack Name</th>
                    <th>Cards</th>
                    <th>Last Updated</th>
                    <th>Created by</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cardsPacks.reverse().map((elem: CardPackType) => (
                    <tr>
                        <td>{elem.name}</td>
                        <td>{elem.cardsCount}</td>
                        <td>{elem.updated}</td>
                        <td>{elem.user_name}</td>
                        <td>
                            <SuperButton
                                fontColor={'black'}
                                fontSize={'smallFont'}
                                size={'small'}
                                onClick={() => onClickCardPackDelete(elem._id)}>
                                DELETE
                            </SuperButton>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}