import React, { Component } from 'react';
import styles from './style.module.css';
import {openDrawer} from '../../common/drawer/container/actions';
import {store} from '../../../store';
class UserForm extends Component {
    onFieldChange = (value, name) => {
        this.setState( Object.assign( this.state.user, {[name]: value}));
    };

    render() {
        let userData = this.props.userData.data;
        if(!userData){
            userData = []
        }
        return (
            <div>
                <div className={styles.formWrapper} >
                    <h2>{userData.firstName + ' ' + userData.lastName}</h2>
                    <p>{userData.position}</p>

                    <div className={styles.permissionWrapper}>
                        <h3>{userData.role.displayName}</h3>
                        <ul className={styles.permissionList}>
                            {userData.permissions.filter((items, index) => (index < 7)).map(item => (
                                <li key={item.label}>{item.label}</li>
                            ))}
                        </ul>
                    </div>

                    <p>{userData.contact.email}</p>

                    <div onClick={() => {store.dispatch(openDrawer(
                        { action: 'update', title: 'Edit User', type: 'user', className: 'userDrawer', showPassword: true }
                    ))}} className={styles.passwordButton}>Change Password</div>

                    <div className={styles.editButtonProfile}>Actions Artboard with history</div>
                </div>
            </div>
        )
    }
}



export default UserForm
