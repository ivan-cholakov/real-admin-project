import React, { Component } from 'react';
import styles from './style.module.css';
import ViewUser from '../../../components/ViewUser';
class DeleteUser extends Component {
    render() {
        return (
            <div className={styles.componentWrapper}>
                <ViewUser sessionId = {this.props.userProfile.session.id} usersData = {this.props.usersData} />
                <div className={styles.deleteCompanyBtn} onClick={() => {this.props.deleteUser(this.props.usersData.id)}}>
                    Delete User
                </div>
            </div>
        )
    }
}

export default DeleteUser
