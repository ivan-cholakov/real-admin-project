import React, { Component } from 'react';
import styles from './style.module.css';
import ViewBrand from '../Overview';
class DeleteBrand extends Component {
    render() {
        return (
            <div className={styles.componentWrapper}>
                <ViewBrand sessionId = {this.props.userProfile.session.id} brandsData = {this.props.brandsData} />
                <div className={styles.deleteCompanyBtn} onClick={() => {this.props.deleteBrand(this.props.brandsData.id)}}>
                    Delete Brand
                </div>
            </div>
        )
    }
}

export default DeleteBrand
