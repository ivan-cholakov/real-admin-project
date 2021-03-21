import React from 'react';
import styles from './style.module.css';

export const Loader = () => {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
        </div>
    )
}
