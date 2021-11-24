import React from 'react';
import styles from './Profile.module.css'
import {Header} from "../../../main/ui/header/Header";


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
                    </div>
                </div>
            </div>
        </>
    );
}

