import React, { Component } from 'react';
import styles from './style.module.css';
import { Icon } from 'antd';

class ButtonIcon extends Component {
    render() {
        return (
            <div className={styles.iconContainer}>
                <Icon type={this.props.icon} />
            </div>
        )
    }
}

export default ButtonIcon
