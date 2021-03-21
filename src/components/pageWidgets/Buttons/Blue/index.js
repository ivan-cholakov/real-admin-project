import React, { Component } from 'react';
import styles from './style.module.css';

class BlueButton extends Component {
    render() {
        return (
            <div
                hidden={this.props.hidden}
                onClick={this.props.onClick}
                style={{ pointerEvents: this.props.disabled ? 'none' : '', opacity: (this.props.disabled) ? '0.5' : '' }}
                className={styles.button}
            >
                {this.props.title}
            </div>
        )
    }
}

export default BlueButton
