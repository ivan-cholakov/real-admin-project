import React, { Component } from 'react';
import styles from './style.module.css';

class Bubble extends Component {
    render() {

        return (
            <div className={[styles.bubbleContainer, styles[this.props.fill]].join(' ')}>
                <span className={styles.txtContainer}>
                    <div className={styles.bigTxt}>{this.props.bigTxt}</div>
                    <div className={styles.mediumTxt}>{this.props.mediumTxt}</div>
                </span>
                <div className={styles.smallTxt}>{this.props.smallTxt}</div>
            </div>
        );
    }
}

export default Bubble
