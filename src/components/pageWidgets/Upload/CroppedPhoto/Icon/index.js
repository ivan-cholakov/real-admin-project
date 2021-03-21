import React, { Component } from 'react';
import styles from './style.module.css';
import { Avatar } from 'antd';

class Icon extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.iconContainer}>
                    <Avatar icon={'plus'} className={styles.plusIcon} size={18} />
                </div>
            </div>
        )
    }
}

export default Icon
