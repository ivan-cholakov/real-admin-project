import React, { Component } from 'react';
import styles from './style.module.css';
import ViewCompany from '../Overview';
class ReadBrand extends Component {
    render() {
        return (
            <div className={styles.componentWrapper}>
                <ViewCompany sessionId = {this.props.userProfile.session.id} brandData = {this.props.brandData} />
            </div>
        )
    }
}



export default ReadBrand
