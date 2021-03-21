import React, { Component } from 'react';
import styles from './style.module.css';

class IconButton extends Component {
    render() {
        const smallClassName = this.props.small? styles.small : '';
        return (
            <div className={[styles.buttonContainer, smallClassName].join(' ')} onClick={this.props.onClick}>
                <div className={styles.icon} >{this.props.icon}</div>
                <div style={{color: this.props.titleColor}} className={styles.title}>{this.props.title}</div>
            </div>
        )
    }
}

export default IconButton
