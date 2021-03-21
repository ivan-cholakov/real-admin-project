import React, { Component } from 'react';
import styles from './style.module.css';
import { Input, Button, Form } from 'antd';
import { debounce } from 'lodash';

class ForgottenPassword extends Component {
    constructor(props) {
        super(props);
        this.state = { mailWarning: false }
        this.usernameInput = React.createRef();
        this.container = React.createRef();
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleForgottenPassword = debounce(this.handleForgottenPassword.bind(this),200);
    }
    componentDidMount() {
        this.props.resetValidationErrors();
        this.container.current.addEventListener('keypress', this.handleKeyPress);
    }
    componentWillUnmount() {
        this.container.current.removeEventListener('keypress', this.handleKeyPress);
    }
    componentDidUpdate() {
    }
    resetValidationAndHandleForgottenPassword() {
        this.props.resetValidationErrors();
        this.handleForgottenPassword();
    }
    handleKeyPress(e) {
        const key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            this.resetValidationAndHandleForgottenPassword();
        }

    }
    handleForgottenPassword() {
        const username = this.usernameInput.current.input.value;
        this.props.forgottenPassword(username);
        this.usernameInput.current.input.value = '';
    }
    render() {
        return (
            <div className={styles.pageWrapper} ref={this.container}>
                <div className={styles.pageContent}>
                    <h1>Forgot your password?</h1>
                    <h2>Please enter the E-mail address registered to your account.</h2>
                    <div className={styles.formContainer}>
                        <Form className={styles.formContainer}>
                            <Input type="text" ref={this.usernameInput} />
                            <div className={styles.warningField}>
                                {this.props.validationErrors.username ? this.props.validationErrors.username : ''}
                            </div>
                            <Button className={styles.btn} onClick={this.resetValidationAndHandleForgottenPassword}>Reset password</Button>
                        </Form>
                    </div>
                </div>
            </div>

        );
    }
}

export default ForgottenPassword
