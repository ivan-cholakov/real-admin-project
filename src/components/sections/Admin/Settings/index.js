import React, { Component } from 'react';
import styles from './style.module.css';

class Settings extends Component {
    onChange = () => {
    }
    render() {
        return (
            <div className={styles.screenWrapper}>
                <div className={styles.innerContent}>
                    <div className={styles.titleContainer}>
                        <h1>Settings</h1>
                    </div>

                </div>
            </div>
        );
    }
}

export default Settings;

