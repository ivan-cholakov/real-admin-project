import React, { Component } from 'react';
import styles from './style.module.css';
import ViewTrail from '../../../components/ViewTrail';
class DeleteTrail extends Component {
    render() {
        return (
            <div className={styles.componentWrapper}>
                <ViewTrail sessionId = {this.props.userProfile.session.id} trailsData = {this.props.trailsData} />
                <div className={styles.deleteCompanyBtn} onClick={() => {this.props.deleteTrail(this.props.trailsData.id)}}>
                    Delete Trail
                </div>
            </div>
        )
    }
}

export default DeleteTrail
