import { Button, Form, Input } from 'antd';
import React, { Component } from 'react';
import styles from './style.module.css';
import { debounce } from 'lodash';
const FormItem = Form.Item;

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = { fieldWarnings: {} };
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChangePassword = debounce(this.handleChangePassword.bind(this),200);
        this.resetValidationAndChangePassword = this.resetValidationAndChangePassword.bind(this);
        this.container = React.createRef();
        this.passInput = React.createRef();
        this.pass1Input = React.createRef();
        this.pass2Input = React.createRef();

    }
    componentDidMount() {
        this.container.current.addEventListener('keypress', this.handleKeyPress);
    }
    componentWillUnmount() {
        this.container.current.removeEventListener('keypress', this.handleKeyPress);
    }
    componentDidUpdate() {
    }
    resetValidationAndChangePassword() {
        this.props.resetValidationErrors();
        this.handleChangePassword();
    }
    handleKeyPress(e) {
        const key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter∏
            this.resetValidationAndChangePassword();
        }
    }
    handleChangePassword() {
        let passwordInput = this.passInput.current.input;
        let pass1Input = this.pass1Input.current.input;
        let pass2Input = this.pass2Input.current.input;
        if (pass1Input.value === pass2Input.value) {
            this.setState({ fieldWarnings: { passWarning: false } });
            this.props.changePassword(passwordInput.value, pass1Input.value);
            passwordInput.value = '';
            pass1Input.value = '';
            pass2Input.value = '';

        }
        else {
            this.setState({ fieldWarnings: { passWarning: true } });

        }
    }
    render() {
        return (
            <div className={styles.pageWrapper} ref={this.container}>
                <div className={styles.pageContent}>

                    <div className={styles.formContainer}>
                        <Form className={styles.formContainer}>
                            <FormItem className={styles.warningMsg}>
                                <Input ref={this.passInput} size="large" type="password" placeholder="Old Password"></Input>
                                <div className={styles.warningField}>
                                    {this.props.validationErrors.currentPassword ? this.props.validationErrors.currentPassword : ''}
                                </div>
                            </FormItem>

                            <FormItem className={styles.warningMsg}>
                                <Input ref={this.pass1Input} size="large" type="password" placeholder="New Password"></Input>
                                <div className={styles.warningField}>
                                    {this.props.validationErrors.newPassword ? this.props.validationErrors.newPassword : ''}
                                </div>
                            </FormItem>

                            <FormItem
                            >
                                <Input ref={this.pass2Input} size="large" type="password" placeholder="Confirm Password"></Input>
                                <div className={styles.warningField}>
                                    {this.state.fieldWarnings.passWarning ? 'Same as new password.' : ''}
                                </div>
                            </FormItem>

                            <Button className={styles.btn} onClick={this.resetValidationAndChangePassword}>Reset password</Button>
                        </Form>
                    </div>
                </div>
            </div>

        );
    }
}

export default ChangePassword
