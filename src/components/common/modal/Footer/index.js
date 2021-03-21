import React, { Component } from 'react';
import styles from './style.module.css';
import BlueButton from '../../../pageWidgets/Buttons/Blue';
import BlueOutlineButton from '../../../pageWidgets/Buttons/BlueOutline';

class ModalFooter extends Component {
    render() {
        return (
            <div className={styles.modalFooter}>
                <div className={styles.cancelBtnContainer}>
                    <BlueOutlineButton fat={true} title={this.props.cancelTitle} onClick={this.props.onCancel} />
                </div>
                <div className={styles.addBtnContainer}>
                    <BlueButton title={this.props.okTitle} onClick={this.props.onSubmit} />
                </div>
            </div>
        )
    }
}



export default ModalFooter
