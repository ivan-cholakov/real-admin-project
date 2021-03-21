import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styles from './style.module.css';
import { Input, Form } from 'antd';
import { debounce } from 'lodash';
const FormItem = Form.Item; 

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = { warnings: [], fieldWarnings: {} };
        this.handleSignUp = debounce(this.handleSignUp.bind(this),200);
        this.resetValidationAndSignUp = this.resetValidationAndSignUp.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.accountDetails = {};
        this.container = React.createRef();
        this.usernameRef = React.createRef();
        this.pass1Ref = React.createRef();
        this.pass2Ref = React.createRef();
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
            this.resetValidationAndSignUp();
        }
    }
    resetValidationAndSignUp() {
        this.props.resetValidationErrors();
        this.handleSignUp();
    }
    handleSignUp() {
        
        const username = this.usernameRef.current.input.value;
        const pass1 = this.pass1Ref.current.input.value;
        const pass2 = this.pass2Ref.current.input.value
        if(pass1 !== pass2) {
            this.setState({fieldWarnings: {pass2Warning: true}});
        }
        else {
            this.setState({fieldWarnings: {pass2Warning: false}});
            this.props.register(username, pass1, pass2);
        }
        
    }
    render() {
        return (
            <div className={styles.innerWrapperRight} ref={this.container}>
                <h1>Create your Account</h1>
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
                        <Input type="password" ref={this.pass1Ref} />
                        <div className={styles.warningField}>
                            {this.props.validationErrors.password ? this.props.validationErrors.password : ''}
                        </div>

                    </div>
                    <div className={styles.inputWrapper}>
                        <div className={styles.label}>
                            Repeat Password
                        </div>
                        <FormItem
                            validateStatus="warning"
                            help={this.state.fieldWarnings.pass2Warning ? 'Same as password' : ''}
                        >
                            <Input type="password" ref={this.pass2Ref} />
                        </FormItem>

                    </div>
                </Form>
                <div className={styles.btnWrapper}>
                    <div className={styles.signBtn} onClick={this.resetValidationAndSignUp}>
                        Sign Up
                    </div>
                    <span className={styles.linkWrapper}>
                        <Link to="/sign-in">I already have an account</Link>
                    </span>
                </div>

            </div>

        );
    }
}

export default CreateAccount;
