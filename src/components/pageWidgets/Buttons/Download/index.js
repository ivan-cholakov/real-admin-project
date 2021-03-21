import React, { Component } from 'react';
import styles from './style.module.css';
import { Icon } from 'antd';

class DownloadButton extends Component {
    render() {
        return (
            <div className={styles.downloadBtn}>
                <Icon type={'download'} />
                <span>{this.props.title}</span>
            </div>
        )
    }
}

export default DownloadButton
