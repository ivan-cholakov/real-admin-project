import React, { Component } from 'react';
import styles from './style.module.css';
import ViewManufacturer from '../../../components/ViewManufacturer';
class DeleteManufacturer extends Component {
    render() {
        return (
            <div className={styles.componentWrapper}>
                <ViewManufacturer sessionId = {this.props.userProfile.session.id} manufacturersData = {this.props.manufacturersData} />
                <div className={styles.deleteCompanyBtn} onClick={() => {this.props.deleteManufacturer(this.props.manufacturersData.id)}}>
                    Delete Manufacturer
                </div>
            </div>
        )
    }
}

export default DeleteManufacturer
