import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styles from './style.module.css';
import { Input, Form } from 'antd';
import { debounce } from 'lodash';

class AccountLogin extends Component {
    constructor(props) {
        super(props);
        this.state = { warnings: [], fieldWarnings: {} };
        this.handleSignIn = debounce(this.handleSignIn.bind(this),200);
        this.resetValidationAndSignIn = this.resetValidationAndSignIn.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.container = React.createRef();
        this.usernameRef = React.createRef();
        this.passRef = React.createRef();
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
    handleKeyPress(e) {
        const key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            this.resetValidationAndSignIn();
        }
    }
    resetValidationAndSignIn() {
        this.props.resetValidationErrors();
        this.handleSignIn();
    }
    handleSignIn() {
        const userName = this.usernameRef.current.input.value;
        const pass = this.passRef.current.input.value;
        this.props.login(userName, pass);
    }
    render() {
        return (
            <div className={styles.innerWrapperRight} ref={this.container}>

                <h1>Sign into your Account</h1>
                <Form className={styles.formContainer}>
                    <div className={styles.inputWrapper}>
                        <div className={styles.label}>
                            E-mail
                        </div>
                        <Input type="text" ref={this.usernameRef} />
                        <div className={styles.warningField}>
                            {this.props.validationErrors.username ? this.props.validationErrors.username : ''}
                        </div>
                    </div>
                    <div className={styles.inputWrapper}>
                        <div className={styles.label}>
                            Password
                        </div>
                        <Input type="password" ref={this.passRef} />
                        <div className={styles.warningField}>
                            {this.props.validationErrors.password ? this.props.validationErrors.password : ''}
                        </div>
                    </div>
                </Form>
                <div className={styles.btnWrapper}>
                    <div className={styles.signBtn} onClick={this.resetValidationAndSignIn}>
                        Sign In
                    </div>
                    <span className={styles.linkWrapper}>
                        <Link to="/forgotten-password">Forgotten password?</Link>
                    </span>
                    <div>
                        <span className={styles.linkWrapper}>
                            <Link to="/onboarding">Don't have an account?</Link>
                        </span>
                    </div>
                    
                </div>


            </div>

        );
    }
}

export default AccountLogin;
