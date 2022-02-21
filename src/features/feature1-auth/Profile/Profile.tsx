import React, {useEffect} from 'react';
import styles from './Profile.module.css'
import {Header} from "../../../main/ui/header/Header";
import {CardsTable} from "../../feature2-table/cards-table/CardsTable";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../main/bll/store";
import {Navigate} from "react-router-dom";

import {authUserTC, logoutTC} from "../Login/login-reduser";
import SuperButton from "../../../main/ui/common/c2-SuperButton/SuperButton";
import {
    changeCardsCountFilter,
    changeFiltering,
    FilteringType
} from "../../feature2-table/cards-table/cardsTable-reduser";
import {path} from "../../../main/ui/routes/Routes";
import MultiRangeSlider from "../../../main/ui/common/MultiRangeSlider/MultiRangeSlider";


export function Profile() {
    const dispatch = useDispatch()
    const authStatus = useSelector<AppRootStateType, boolean>(state => state.login.authStatus)
    const filteredBy = useSelector<AppRootStateType, FilteringType>(state => state.cardsPacks.filteredBy)
    const minCardsCountFilter = useSelector<AppRootStateType, number>(state => state.cardsPacks.minCardsCountFilter)
    const maxCardsCountFilter = useSelector<AppRootStateType, number>(state => state.cardsPacks.maxCardsCountFilter)
    const minCardsCount = useSelector<AppRootStateType, number>(state => state.cardsPacks.minCardsCount)
    const maxCardsCount = useSelector<AppRootStateType, number>(state => state.cardsPacks.maxCardsCount)

    useEffect(() => {
        if (!authStatus) {
            dispatch(authUserTC())
        }
    }, [])

    const sendLogoutRequest = () => {
        dispatch(logoutTC())
    }

    const onMyBtnClick = () => {
        dispatch(changeFiltering('my'))
    }

    const onAllBtnClick = () => {
        dispatch(changeFiltering('all'))
    }

    const onChangeDubleRange = (value: number[]) => {
        dispatch(changeCardsCountFilter(value[0],value[1]))
    }

    if (!authStatus) {
        return <Navigate to={path.login}/>
    } else {
        return (
            <>
                <Header/>
                <div className={styles.tableContainer}>
                    <div className={styles.mainWrapper}>
                        <div className={styles.leftBar}>
                            <h3 className={styles.leftBarTitle}>Show packs cards</h3>
                            <div className={styles.filterBtnsWrapper}>
                                <SuperButton
                                    classBtn={filteredBy === 'my' ? 'filterMyBtnActive' : 'filteMyBtn'}
                                    onClick={onMyBtnClick}>
                                    My
                                </SuperButton>
                                <SuperButton
                                    classBtn={filteredBy === 'all' ? 'filterAllBtnActive' : 'filterAllBtn'}
                                    onClick={onAllBtnClick}>
                                    All
                                </SuperButton>
                            </div>
                            <MultiRangeSlider
                                min={minCardsCount}
                                max={maxCardsCount}
                                value={[minCardsCountFilter, maxCardsCountFilter]}
                                onChangeRange={onChangeDubleRange}
                            />
                            <SuperButton
                                classBtn={'cancelBtn'}
                                onClick={() => sendLogoutRequest()}>
                                Logout
                            </SuperButton>
                        </div>
                        <div className={styles.tableWrapper}>
                            Packs list
                            <CardsTable/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

