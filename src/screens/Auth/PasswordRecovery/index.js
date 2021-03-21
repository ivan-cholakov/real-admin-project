import React, { Component } from 'react';
import styles from './style.module.css';
import {withRouter} from 'react-router-dom';
import { Input, Button, Form } from 'antd';
import { debounce } from 'lodash';
const FormItem = Form.Item;

class PasswordRecovery extends Component {
    constructor(props) {
        super(props);
        this.state = { mailWarning: false };
        this.token = props.match.params.token;
        this.passInput = React.createRef();
        this.pass1Input = React.createRef();
        this.container = React.createRef();
        this.resetValidationAndHandlePasswordRecovery = this.resetValidationAndHandlePasswordRecovery.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handlePasswordRecovery = debounce(this.handlePasswordRecovery.bind(this),200);
    }
    componentDidMount() {
        this.props.resetValidationErrors();
        this.container.current.addEventListener('keypress', this.handleKeyPress);
        this.props.verifyToken(this.token);
    }
    componentWillUnmount() {
        this.container.current.removeEventListener('keypress', this.handleKeyPress);
    }
    componentDidUpdate() {
        if(this.props.redirectToSignIn){
            this.props.history.push('/sign-in');
        }
    }
    resetValidationAndHandlePasswordRecovery() {
        this.props.resetValidationErrors();
        this.handlePasswordRecovery();
    }
    handleKeyPress(e) {
        const key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            this.resetValidationAndHandlePasswordRecovery();
        }

    }
    handlePasswordRecovery() {
        let pass1warning = false;
        const pass = this.passInput.current.input.value;
        const pass1 = this.pass1Input.current.input.value;
        if (pass !== pass1) {
            pass1warning = true;
        }
        if (!pass1warning) {
            this.props.passwordRecovery(pass, this.token);
        }
        this.setState({ pass1warning: pass1warning });
    }
    render() {
        let renderedComponent;
        const invalidTokenComponent = (
            <div className={styles.pageWrapper} ref={this.container}>
                <div className={styles.invalidToken}>
                    Your token is invalid. Please request password change again.
                </div>
            </div>
        )
        const validTokenComponent = (

            <div className={styles.pageWrapper} ref={this.container}>
                <div className={styles.pageContent}>
                    <h1>Change your password</h1>
                    <div className={styles.formContainer}>
                        <Form className={styles.formContainer}>
                            <Input type="password" ref={this.passInput} placeholder="New password" />
                            <div className={styles.warningField}>
                                {this.props.validationErrors.newPassword ? this.props.validationErrors.newPassword : ''}
                            </div>
                            <FormItem
                                validateStatus="warning"
                                help={this.state.pass1warning ? 'Same as password!' : ''}
                            >
                                <Input type="password" ref={this.pass1Input} placeholder="Repeat password" />
                            </FormItem>
                            <Button className={styles.btn} onClick={this.handlePasswordRecovery}>Submit</Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
        renderedComponent = this.props.validToken ? validTokenComponent : invalidTokenComponent;
        return (
            <div>
                {renderedComponent}
            </div>
        );
    }
}

export default withRouter(PasswordRecovery)
