import React, { Component } from 'react';
import styles from './style.module.css';
import ViewCompany from '../../../components/ViewCompany';
class ReadMaterial extends Component {
    render() {
        return (
            <div className={styles.componentWrapper}>
                <ViewCompany sessionId = {this.props.userProfile.session.id} materialData = {this.props.materialData} />
            </div>
        )
    }
}



export default ReadMaterial
