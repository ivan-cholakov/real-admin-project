import React, { Component } from 'react';
import styles from './style.module.css';

class RolesAndPermissions extends Component {
    constructor(props) {
        super(props);
        this.props.getPermissions();
    }
    render() {
        return (
            <div className={styles.pageContent}>
                Hi from Roles and Permissions Page
            </div>
        )
    }
}

export default RolesAndPermissions
