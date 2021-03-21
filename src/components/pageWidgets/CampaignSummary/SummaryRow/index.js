import React from 'react';
import styles from './style.module.css';

export const SummaryRow = (props) => {
    return (
        <div className={styles.rowWrapper}>
            <div className={styles.boldTxt}>
                {props.index}
            </div>
            <div className={styles.dash}>
                -
            </div>
            <div className={styles.ruleTxt}>
                {props.text}
            </div>
        </div>
    )
}