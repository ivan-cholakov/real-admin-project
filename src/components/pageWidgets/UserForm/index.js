import React, { Component } from 'react';
import styles from './style.module.css';
import BlueButton from '../Buttons/Blue';
import TextInput from '../TextInput';
import CustomDropdown from '../Dropdown';

class UserForm extends Component {
    constructor(props){
        super(props);
        this.state={formData: {}}
    }

    onChange = (value, name) => {
        this.setState(Object.assign(this.state.formData, { [name]: value }));
    };

    handleSubmit = () => {
        this.props.onSubmit(this.state.formData)
        this.setState({})
    }

    render() {
        return (
            <div className={[styles.formContainer, !this.props.show? 'hiddenForm': ''].join(' ')}>
                <div className={styles.columnContainer}>
                    <div className={styles.column}>
                        <TextInput
                            value={this.state.formData.firstName}
                            onChange={(value) => {this.onChange(value, 'firstName')}}
                            placeholder={'Enter first name'}
                            label="First Name"
                        />
                    </div>
                    <div className={styles.column}>
                        <TextInput
                            value={this.state.formData.lastName}
                            onChange={(value) => {this.onChange(value, 'lastName')}}
                            placeholder={'Enter last name'}
                            label="Last Name"
                        />
                    </div>
                </div>
                <div className={styles.columnContainer}>
                    <div className={styles.column}>
                        <TextInput
                            value={this.state.formData.email}
                            onChange={(value) => {this.onChange(value, 'email')}}
                            placeholder={'Enter email'}
                            label="Email"
                        />
                    </div>
                    <div className={styles.column}>
                        <CustomDropdown
                            value={this.state.formData.roleId}
                            onChange={(value) => {this.onChange(value, 'roleId')}}
                            label={'Access Level'}
                            placeholder={'Select'}
                            items={this.props.rolesDropdown}
                        />
                    </div>
                </div>
                <div className={styles.columnContainer}>
                    <TextInput
                        type={'textarea'}
                        value={this.state.formData.message}
                        onChange={(value) => {this.onChange(value, 'message')}}
                        placeholder={'Enter a personalised invitation message...'}
                        label="Message"/>
                </div>
                <div className={styles.columnContainer}>
                    <span className={styles.addButton}>
                        <BlueButton
                            title={'ADD USER'}
                            onClick={this.handleSubmit}
                        />
                    </span>
                </div>

            </div>

        );
    }
}

export default UserForm
