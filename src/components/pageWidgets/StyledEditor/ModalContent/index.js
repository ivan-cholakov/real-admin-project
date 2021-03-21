import React, {Component} from 'react';
import styles from '../../Upload/Video/ModalContent/style.module.css';
import TextInput from '../../TextInput';
import ModalFooter from '../../../common/modal/Footer';
import ValidationWarning from '../../ValidationWarning';

class QuoteModalContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            quote: this.props.value || '',
            author: ''
        };
    }

    static defaultProps = {
        okTitle: 'Submit'
    }

    handleQuoteChange = (value) => {
        this.setState({quote: value})
    };

    handleAuthorChange = (value) => {
        this.setState({author: value})
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state);
    };

    handleCancel = () => {
        this.props.onCancel();
    };

    render() {
        return(
            <div className={styles.modalContentContainer}>
                <div className={styles.modalContent}>
                    <div className={styles.description}>
                        Enter a quote:
                    </div>
                    <div className={styles.inputContainer}>
                        <TextInput
                            backgroundStyle={'grey'}
                            onChange={this.handleQuoteChange}
                            placeholder={'Quote'}
                            type={'textarea'}
                            value={this.state.quote}
                        />
                        <ValidationWarning
                            warning={this.state.warning}
                        />
                    </div>
                    <div className={styles.description}>
                        Quote author:
                    </div>
                    <div className={styles.inputContainer}>
                        <TextInput
                            backgroundStyle={'grey'}
                            onChange={this.handleAuthorChange}
                            placeholder={'Author'}
                            value={this.state.author}
                        />
                        <ValidationWarning
                            warning={this.state.warning}
                        />
                    </div>
                    <ModalFooter
                        cancelTitle = {'Cancel'}
                        okTitle={this.props.okTitle}
                        onSubmit = {this.handleSubmit}
                        onCancel = {this.handleCancel}
                    />
                </div>
            </div>
        )
    }
}

export default QuoteModalContent
