import React, { Component } from 'react';
import styles from './style.module.css';
import ViewCompany from '../../../components/ViewCompany';
class ReadStockist extends Component {
    render() {
        return (
            <div className={styles.componentWrapper}>
                <ViewCompany sessionId = {this.props.userProfile.session.id} stockistData = {this.props.stockistData} />
            </div>
        )
    }
}



export default ReadStockist
