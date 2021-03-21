import React, { Component } from 'react';
import styles from './style.module.css';
import ButtonIcon from '../ButtonIcon';

class SmallWhiteButton extends Component {
    render() {
        return (
            <div
                className={styles.btn}
                hidden={this.props.hidden}
                onClick={this.props.onClick}
                style={{ pointerEvents: this.props.disabled ? 'none' : '', opacity: (this.props.disabled) ? '0.5' : '' }}
            >
                {this.props.icon &&
                    <ButtonIcon icon={this.props.icon}/>
                }
                {this.props.title}
            </div>
        )
    }
}

export default SmallWhiteButton
