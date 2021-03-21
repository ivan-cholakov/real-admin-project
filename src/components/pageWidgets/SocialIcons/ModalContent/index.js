import React, {Component} from 'react';
import styles from '../../Upload/Video/ModalContent/style.module.css';
import TextInput from '../../TextInput';
import ModalFooter from '../../../common/modal/Footer';
import ValidationWarning from '../../ValidationWarning';

class SocialModalContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputValue: this.props.value || ''
        };
    }

    addHttp = (url) => {
        if (url.indexOf('http') === -1) {
            url = 'http://' + url;
        }
        return url;
    }

    handleChange = (value) => {
        value = this.addHttp(value);
        this.setState({inputValue: value})
    };

    handleAdd = () => {
        this.props.onFieldChange(this.state.inputValue, this.props.type);
        this.props.handleVisibleChange();
    };

    handleCancel = () => {
        this.props.handleVisibleChange();
    };

    render() {
        return(
            <div className={styles.modalContentContainer}>
                <div className={styles.modalContent}>
                    <div className={styles.description}>
                        Paste a <span style={{textTransform: 'capitalize'}}>{this.props.type}</span> URL
                    </div>
                    <div className={styles.inputContainer}>
                        <TextInput
                            backgroundStyle={'grey'}
                            onChange={this.handleChange}
                            placeholder={'Enter URL'}
                            value={this.state.inputValue}
                        />
                        <ValidationWarning
                            warning={this.state.warning}
                        />
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
