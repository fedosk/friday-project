import React, {useEffect} from 'react';
import styles from './Profile.module.css'
import {Header} from "../../../main/ui/header/Header";
import {CardsTable} from "../../feature2-table/cards-table/CardsTable";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../main/bll/store";
import {Navigate} from "react-router-dom";
import {path} from "../../../main/ui/routes/Routes";
import {authUserTC, logoutTC} from "../Login/login-reduser";
import SuperButton from "../../../main/ui/common/c2-SuperButton/SuperButton";


export function Profile() {
    const dispatch = useDispatch()
    const authStatus = useSelector<AppRootStateType, boolean>(state => state.login.authStatus)

    useEffect(() => {
        if (!authStatus) {
            dispatch(authUserTC())
        }
    }, [])

    const sendLogoutRequest = () => {
        dispatch(logoutTC())
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
                            Show packs cards
                            <SuperButton
                                color={'blue'}
                                fontColor={'white'}
                                size={'small'}
                                onClick={() => sendLogoutRequest()}
                                btn>
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

