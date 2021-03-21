import React, { Component } from 'react';
import styles from './style.module.css';
import ViewCompany from '../../../components/ViewCompany';
class ReadManufacturer extends Component {
    render() {
        return (
            <div className={styles.componentWrapper}>
                <ViewCompany sessionId = {this.props.userProfile.session.id} manufacturerData = {this.props.manufacturerData} />
            </div>
        )
    }
}



export default ReadManufacturer
