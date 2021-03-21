import React, { Component } from 'react';
import styles from './style.module.css';
import ViewCompany from '../../../components/ViewCompany';
class ReadEcom extends Component {
    render() {
        return (
            <div className={styles.componentWrapper}>
                <ViewCompany sessionId = {this.props.userProfile.session.id} ecomData = {this.props.ecomData} />
            </div>
        )
    }
}



export default ReadEcom
