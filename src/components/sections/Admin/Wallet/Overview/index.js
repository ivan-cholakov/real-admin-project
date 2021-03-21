import React, { Component } from 'react';
import styles from './style.module.css';
import SmallBlueOutline from '../../../../pageWidgets/Buttons/SmallBlueOutline';

class Overview extends Component {
    render() {
        return (
            <div className={styles.contentContainer}>
                <div className={styles.balanceContainer}>
                    <div className={styles.coins}>
                        <span>0.00</span>
                        ALMD
                    </div>
                    <div className={styles.money}>
                        £0.00
                    </div>
                </div>
                <div className={styles.line} />
                <div className={styles.btnContainer}>
                    <SmallBlueOutline
                        icon={'plus'}
                        title={'ADD PAYMENT METHOD'}
                        onClick={() => this.props.changeActiveComponent(1)}
                    />
                </div>
            </div>
        );
    }
}

export default Overview;

