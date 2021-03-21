import React, { Component } from 'react';
import styles from './style.module.css';
import ViewStockist from '../../../components/ViewStockist';
class DeleteStockist extends Component {
    render() {
        return (
            <div className={styles.componentWrapper}>
                <ViewStockist sessionId = {this.props.userProfile.session.id} stockistsData = {this.props.stockistsData} />
                <div className={styles.deleteCompanyBtn} onClick={() => {this.props.deleteStockist(this.props.stockistsData.id)}}>
                    Delete Stockist
                </div>
            </div>
        )
    }
}

export default DeleteStockist
