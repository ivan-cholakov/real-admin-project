import React, { Component } from 'react';
import styles from './style.module.css';
import ViewCompany from '../../../components/ViewCompany';
class ReadProduct extends Component {
    render() {
        return (
            <div className={styles.componentWrapper}>
                <ViewCompany sessionId = {this.props.userProfile.session.id} productData = {this.props.productData} />
            </div>
        )
    }
}



export default ReadProduct
