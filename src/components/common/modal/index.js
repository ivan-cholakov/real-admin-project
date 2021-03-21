import React, { Component } from 'react';
import styles from './style.module.css';
import { Modal } from 'antd';
import ReactDOM from 'react-dom';

class ModalComponent extends Component {

    
    constructor(props) {
        super(props);
        this.hideModal = this.hideModal.bind(this);
    }
    
    static defaultProps = {
        handleVisibleChange: () => {}
    }
    
    handleClickOutside = (e) => {
        if (!this.modalReference) {
            return;
        }
        if (ReactDOM.findDOMNode(this.modalReference).contains(e.target)) {
            return;
        } else {
            this.hideModal();
        }
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside, false);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }
    componentDidUpdate() {
    }

    hideModal() {
        this.props.handleVisibleChange(false);
    }

    render() {
        return (
            <Modal
                destroyOnClose={this.props.destroyOnClose || false}
                visible={this.props.visible}
                onCancel={this.hideModal}
                className={styles.genericModal}
                centered={true}
                closable={false}
                footer={null}
            >
                <div className={styles.modalContentContainer} ref={el => { this.modalReference = el }} style={{width: "100%"}}>
                    <div className={styles.titleContainer}>
                        {this.props.title}
                    </div>
                    <div
                        style={{ background: this.props.background === 'grey' ? '#f8f7f7' : '' }}
                        className={styles.modalInnerContent}>
                        {this.props.children}
                    </div>
                </div>
            </Modal>
        )
    }
}



export default ModalComponent
