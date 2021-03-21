import React, { Component } from 'react';
import styles from './style.module.css';
import ViewEcom from '../../../components/ViewEcom';
class DeleteEcom extends Component {
    render() {
        return (
            <div className={styles.componentWrapper}>
                <ViewEcom sessionId = {this.props.userProfile.session.id} ecomsData = {this.props.ecomsData} />
                <div className={styles.deleteCompanyBtn} onClick={() => {this.props.deleteEcom(this.props.ecomsData.id)}}>
                    Delete Ecom
                </div>
            </div>
        )
    }
}

export default DeleteEcom
