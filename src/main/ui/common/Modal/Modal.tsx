import React, {FC} from 'react';
import styles from './Modal.module.css'
import SuperButton from "../c2-SuperButton/SuperButton";


export type ModalType = {
    index: number
    active: Array<boolean>
    setActive: (activeModal: Array<boolean>) => void
    title: string
}


export const Modal: FC<ModalType> = ({active, setActive, index, title, children}) => {

    return (
        <div
            className={active[index] ? `${styles.modalWrapper} ${styles.active}` : styles.modalWrapper}
            onClick={() => setActive([false])}>
            <div
                className={active[index] ? `${styles.modalContent} ${styles.active}` : styles.modalContent}
                onClick={event => event.stopPropagation()}>
                <div className={styles.headerModalWrapper}>
                    <h3 className={styles.modalTitle}>{title}</h3>
                    <SuperButton
                        classBtn={'btn'}
                        onClick={() => setActive([false])}>
                        <span className={styles.closeBtn}>×</span>
                    </SuperButton>
                </div>
                {children}
            </div>
        </div>
    );
}

