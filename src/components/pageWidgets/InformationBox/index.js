import React, { Component } from 'react';
import styles from './style.module.css';

class InformationBox extends Component {
    render() {

        return (
            <div className={[styles.boxContainer, styles[this.props.fill]].join(' ')}>
                <div className={styles.innerBox}>
                    <div className={styles.title}>{this.props.title}</div>
                    <div className={styles.balance}>
                        <div className={styles.cash}>
                            £{this.props.cash}
                        </div>
                        <div className={styles.almd}>
                            {this.props.coins.toFixed(2)} ALMD
                        </div>
                    </div>
                </div>
                <div className={styles.label}>{this.props.label}</div>
            </div>
        );
    }
}

export default InformationBox
