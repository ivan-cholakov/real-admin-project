import React, { Component } from 'react';
import styles from './style.module.css';
import ViewCompany from '../Overview';
class DeleteCompany extends Component {
    render() {
        return (
            <div className={styles.componentWrapper}>
                <ViewCompany sessionId = {this.props.userProfile.session.id} companyData = {this.props.companyData} />
                <div className={styles.deleteCompanyBtn} onClick={() => {this.props.deleteCompany(this.props.companyData.id)}}>
                    Delete Company
                </div>
            </div>
        )
    }
}

export default DeleteCompany
