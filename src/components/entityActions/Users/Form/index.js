import React, { Component } from 'react';
import styles from './style.module.css';
import TextInput from '../../../pageWidgets/TextInput';
import BlueButton from '../../../pageWidgets/Buttons/Blue';
import { Link } from 'react-router-dom';


class UserForm extends Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.state = { formData: {}, passwordWrapper: this.props.showPassword };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    onFieldChange = (value, name) => {
        this.setState(Object.assign(this.state.formData, { [name]: value }));
    };

    componentDidMount() {
        this.props.resetValidationErrors();
        this.container.current.addEventListener('keypress', this.handleKeyPress);
    }
    componentWillUnmount() {
        this.container.current.removeEventListener('keypress', this.handleKeyPress);
    }
    handleKeyPress(e) {
        const key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            this.handleSubmit();
        }
    }

    handleSubmit() {
        const { newPassword, confirmPassword, currentPassword } = this.state.formData;
        // perform all neccassary validations
        if (this.state.passwordWrapper) {
            if (newPassword !== confirmPassword) {
                alert('Passwords don\'t match');
            } else {
                this.props.changePassword(currentPassword, newPassword);
                this.props.onFormSubmit(this.state.formData);
            }
        } else {
            this.props.onFormSubmit(this.state.formData);
        }
    }

    showPasswordPanel = () => {
        this.setState({ passwordWrapper: true })
    };



    render() {
        let userData = this.props.userData.data;
        if (!userData) {
            userData = []
        }
        return (
            <div>
                <div className={styles.formWrapper} ref={this.container}>
                    <div className={styles.columnContainer}>
                        <div className={styles.column}>
                            <TextInput
                                label="First name"
                                value={this.state.formData.firstName}
                                onChange={(value) => { this.onFieldChange(value, 'firstName') }}
                                defaultValue={userData.firstName}
                            />
                            <div className={styles.warningField}>
                                {this.props.validationErrors.name}
                            </div>
                        </div>
                        <div className={styles.column}>
                            <TextInput
                                label="Surname"
                                value={this.state.formData.lastName}
                                onChange={(value) => { this.onFieldChange(value, 'lastName') }}
                                defaultValue={userData.lastName}
                            />
                            <div className={styles.warningField}>
                                {this.props.validationErrors.name}
                            </div>
                        </div>
                    </div>
                    <div className={styles.columnContainer}>
                        <TextInput
                            label="Position"
                            placeholder={'e.g. Product Manager'}
                            value={this.state.formData.position}
                            onChange={(value) => { this.onFieldChange(value, 'position') }}
                            defaultValue={userData.position}
                        />
                        <div className={styles.warningField}>
                            {this.props.validationErrors.description}
                        </div>
                    </div>
                    <div className={styles.currentRoleContainer}>
                        <span className={styles.currentRole}>{'You are the ' + userData.role.name}</span>
                    </div>
                    <div className={styles.columnContainer}>
                        <TextInput
                            label="Email"
                            value={this.state.formData.email}
                            onChange={(value) => { this.onFieldChange(value, 'email') }}
                            defaultValue={userData.contact.email}
                        />
                        <div className={styles.warningField}>
                            {this.props.validationErrors.description}
                        </div>
                    </div>

                    <div onClick={this.showPasswordPanel} className={styles.passwordButton}>Change Password</div>
                </div>
                <div className={[styles.passwordWrapper, !this.state.passwordWrapper ? 'hiddenWrapper' : ''].join(' ')}>

                    <TextInput
                        grayColor={true}
                        value={this.state.formData.currentPassword}
                        label="Enter current password"
                        type={'password'}
                        onChange={(value) => { this.onFieldChange(value, 'currentPassword') }}
                    />

                    <div className={styles.warningField}>
                        {this.props.validationErrors.name}
                    </div>
                    <div className={styles.forgotPasswordContainer}>
                        <span className={styles.forgotPassword}><Link to="/forgotten-password">Forgot Password?</Link></span>
                    </div>

                    <TextInput
                        grayColor={true}
                        label="Enter new password"
                        type={'password'}
                        value={this.state.formData.newPassword}
                        onChange={(value) => { this.onFieldChange(value, 'newPassword') }}
                    />
                    <div className={styles.warningField}>
                        {this.props.validationErrors.name}
                    </div>
                    <div className={styles.columnContainer}>
                        <TextInput
                            grayColor={true}
                            label="Confirm new password"
                            type={'password'}
                            value={this.state.formData.confirmPassword}
                            onChange={(value) => { this.onFieldChange(value, 'confirmPassword') }}
                        />
                        <div className={styles.warningField}>
                            {this.props.validationErrors.name}
                        </div>
                    </div>
                </div>
                <div className={styles.submitWrapper}>
                    <BlueButton title={'Save'} onClick={this.handleSubmit} />
                </div>
            </div>
        )
    }
}



export default UserForm
