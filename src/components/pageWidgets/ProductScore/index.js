import React from 'react';
import styles from './style.module.css';

function ProductScore(props) {
    return (
        <div className={styles.textContainer}>
            <span className={styles.bigText}>
                {props.bigText}
            </span>
            <span className={styles.smallText}>
                {props.smallText}
            </span>
        </div>
    )
}

export default ProductScore
