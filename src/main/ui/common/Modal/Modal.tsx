import React, {FC} from 'react';
import styles from './Modal.module.css'
import SuperButton from "../c2-SuperButton/SuperButton";


export type ModalType = {
    activeModal: boolean
    setActiveModal: (activeModal: boolean) => void
    title: string
}

export const Modal: FC<ModalType> = ({activeModal, setActiveModal, title, children}) => {
    return (
        <div
            className={activeModal ? `${styles.modalWrapper} ${styles.active}` : styles.modalWrapper}
            onClick={() => setActiveModal(false)}>
            <div
                className={activeModal ? `${styles.modalContent} ${styles.active}` : styles.modalContent}
                onClick={event => event.stopPropagation()}>
                <div className={styles.headerModalWrapper}>
                    <h3 className={styles.modalTitle}>{title}</h3>
                    <SuperButton
                        classBtn={'btn'}
                        onClick={() => setActiveModal(false)}>
                        <span className={styles.closeBtn}>×</span>
                    </SuperButton>
                </div>
                {children}
            </div>
        </div>
    );
}

