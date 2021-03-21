import React, { Component } from 'react';
import styles from './style.module.css';
import DarkGreyButton from '../../pageWidgets/Buttons/DarkGrey';

class Footer extends Component {
    render() {
        return (
            <div className={styles.footerWrapper}>
                <div className={styles.contentWrapper}>
                    <div className={styles.buttonContainer}>
                        <DarkGreyButton title={'LIVE CHAT'}/>
                    </div>
                    <div>Speak to your account manager</div>
                    <div className={styles.footerLinks}>
                        <div>
                            <span>Help</span> | <span>Log-out</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer
