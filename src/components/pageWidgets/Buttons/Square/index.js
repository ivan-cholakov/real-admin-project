import React from 'react';
import styles from './style.module.css';

function SquareButton(props) {
    return <div onClick={props.onClick}>
        <span className={styles.squareButton}>{props.title}</span>
    </div>
}

export default SquareButton
