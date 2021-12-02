import React from 'react';
import styles from './Profile.module.css'
import {Header} from "../../../main/ui/header/Header";
import {CardsTable} from "../../feature2-table/cards-table/CardsTable";


export function Profile() {
    return (
        <>
            <Header/>
            <div className={styles.tableContainer}>
                <div className={styles.mainWrapper}>
                    <div className={styles.leftBar}>
                        Show packs cards
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

