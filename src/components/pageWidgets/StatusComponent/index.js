import styles from './style.module.css';
import React from 'react';

function StatusComponent(props) {
    return (
        <span className={styles.statusLabel}>
            <span className={props.active ? 'activeIndicator' : 'inactiveIndicator'}></span>
            <span className={styles.statusLabel}>{props.active ? 'active' : 'pending'}</span>
        </span>
    )
}

export default StatusComponent
