import React, {Component} from 'react';
import BlueButton from '../../../pageWidgets/Buttons/Blue';
import UserSummary from '../../../pageWidgets/UserSummary';
import styles from './style.module.css';
import UserForm from '../../../pageWidgets/UserForm';

class UsersScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            formVisible: false
        }
    }

    componentDidMount() {
        this.props.loadData();
        this.props.resetValidationErrors()
    }

    showForm = () => {
        this.setState({formVisible: true})
    };

    handleSubmit = (params) => {
        this.props.onSubmit(params)
        this.setState({})
    }

    render() {
        return(
            <div className={styles.screenWrapper}>
                <BlueButton
                    icon={'plus'}
                    title={'Add New User'}
                    onClick={this.showForm}
                    hidden={this.state.formVisible}
                />  
                <UserForm
                    rolesDropdown={this.props.rolesDropdown}
                    show={this.state.formVisible}
                    onSubmit={this.handleSubmit}
                />
                <div className={styles.userInfo}>
                    <UserSummary />
                </div>
            </div>
        );
    }
}

export default UsersScreen;

