import React from 'react';
import styles from './style.module.css';

function ConversionCircle(props){
    return <span className={styles.circleContainer}>
        <span className={styles.circleGradient}>
            {props.label}
        </span>
    </span>
}

export default ConversionCircle
