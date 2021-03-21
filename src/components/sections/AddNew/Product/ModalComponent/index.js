import React, { Component } from 'react';
import styles from './style.module.css';
import { Modal } from 'antd';

class ModalComponent extends Component {
    render() {
        return (
            <Modal
                destroyOnClose = {this.props.destroyOnClose || false}
                visible={this.props.visible}
                onCancel={this.props.onCancel}
                className={styles.genericModal}
                centered={true}
                closable={false}
                footer={null}
            >
                <div className={styles.modalContentContainer}>
                    <div className={styles.titleContainer}>
                        {this.props.title}
                    </div>
                    <div
                        style={{background: this.props.background === 'grey'? '#f8f7f7' : ''}}
                        className={styles.modalInnerContent}>
                        {this.props.children}
                    </div>
                </div>
            </Modal>
        )
    }
}



export default ModalComponent
