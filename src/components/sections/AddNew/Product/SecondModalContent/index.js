import React, {Component} from 'react';
import styles from '../style.module.css';
import TextInput from '../../../../pageWidgets/TextInput';
import ModalFooter from '../../../../common/modal/Footer';
import ValidationWarning from '../../../../pageWidgets/ValidationWarning';

class SocialModalContent extends Component {

    state = {
        inputValue: this.props.value || ''
    };

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props){
            this.setState({value: this.props.value})
        }
    }


    handleChange = (value) => {
        this.setState({inputValue: value})
    };

    handleAdd = () => {
        this.props.onModalSubmit(this.state.inputValue)
        this.props.handleVisibleChange();
    };

    handleCancel = () => {
        this.props.handleVisibleChange();
    };

    render() {
        return(
            <div className={styles.modalContentContainer}>
                <div className={styles.modalContent}>
                    <div className={styles.inputContainer}>
                        <TextInput
                            label={this.props.inputLabel}
                            onChange={this.handleChange}
                            placeholder={'Enter URL'}
                            value={this.state.inputValue}
                        />
                        <ValidationWarning warning={this.state.warning} />
                    </div>
                    <ModalFooter
                        cancelTitle = {'Cancel'}
                        okTitle={this.props.okTitle}
                        onSubmit = {this.handleAdd}
                        onCancel = {this.handleCancel}
                    />
                </div>
            </div>
        )
    }
}

export default SocialModalContent
