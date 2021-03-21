import React, { Component } from 'react';
import styles from './style.module.css';
import { connect } from 'react-redux';
import TextInput from '../../../../pageWidgets/TextInput';
import ModalFooter from '../../../../common/modal/Footer';
import CustomDropdown from '../../../../pageWidgets/Dropdown';
import LinkAttachment from '../../../../pageWidgets/LinkAttachment';
import ModalContent from '../SecondModalContent'
import ModalComponent from '../../../../common/modal';
import { triggerNotification } from '../../../../common/Notification/actions';

class ProductModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                ...props.modalContent
            },
            visible: false,
            modalTitle: '',
        };
    }

    handleChange = (value, name) => {
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                [name]: value
            }
        })
    };

    handleAdd = () => {
        if (!this.state.formData.type) {
            this.props.triggerNotification({ type: 'error', msg: 'Please specify type.', duration: 5 });
            return;
        }
        if (!this.state.formData.attachment && !this.state.formData.hyperlink) {
            this.props.triggerNotification({ type: 'error', msg: 'Please provide proof.', duration: 5 });
            return;
        }
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                'id': `${this.state.type}${new Date().getTime()}`
            }
        }, () => {
            this.props.onModalSubmit(this.state.formData);
        })

    };

    handleSecondModal = (visible) => {
        this.setState({ visible });
    };

    onSecondModalSubmit = (value) => {
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                attachment: null,
                hyperlink: value
            }
        })
    };

    handleFileChange = (file) => {
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                attachment: file,
                hyperlink: null,
            }
        })
    }

    render() {
        const { formData } = this.state;
        return (
            <div className={styles.modalContentContainer}>
                <div className={styles.modalContent}>
                    <div className={styles.columnContainer}>
                        <div className={styles.column}>
                            <CustomDropdown
                                onChange={(value) => this.handleChange(value, 'type')}
                                placeholder={'Select'}
                                label="Type"
                                value={formData.type}
                                items={this.props.certificates}
                            />
                        </div>

                        <div className={styles.column}>
                            <LinkAttachment
                                handleSecondModal={this.handleSecondModal}
                                label="Proof"
                                onFileChange={this.handleFileChange}
                                activeHyperlink={this.state.formData.hyperlink}
                                activeAttachment={this.state.formData.attachment}
                                onClickLink={() => this.setState({
                                    visible: true,
                                    modalTitle: 'ADD OFFICIAL URL AS PROOF',
                                    type: 'hyperlink',
                                    value: this.state.formData.hyperlink
                                })}
                            />
                        </div>

                    </div>
                    <div className={styles.inputContainer}>
                        <TextInput
                            type={'textarea'}
                            label="Add Note"
                            tooltipTitle={'Optional'}
                            onChange={(value) => this.handleChange(value, 'note')}
                            value={formData.note}
                        />
                    </div>
                    <ModalFooter
                        cancelTitle={'Cancel'}
                        okTitle={this.props.okTitle}
                        onSubmit={this.handleAdd}
                        onCancel={this.props.onModalCancel} />
                </div>

                <ModalComponent
                    destroyOnClose={true}
                    visible={this.state.visible}
                    background={'grey'}
                    handleVisibleChange={this.handleSecondModal}
                    title={this.state.modalTitle}
                    footer={null}
                >
                    <ModalContent
                        inputLabel={'Product Registration Link'}
                        style={{ padding: 10 }}
                        modalContent={this.state.modalContent}
                        onModalSubmit={this.onSecondModalSubmit}
                        okTitle={'Save'}
                        handleVisibleChange={this.handleSecondModal}
                    />
                </ModalComponent>
            </div>
        )
    }
}

ProductModalContent.defaultProps = {
    modalContent: {}
}

const mapDispatchToProps = (dispatch) => ({
    triggerNotification: (notification) => {
        dispatch(triggerNotification(notification));
    }
});

export default connect(null, mapDispatchToProps)(ProductModalContent)
