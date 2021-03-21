import React, { Component } from 'react';
import styles from './style.module.css';
import ViewMaterial from '../../../components/ViewMaterial';
class DeleteMaterial extends Component {
    render() {
        return (
            <div className={styles.componentWrapper}>
                <ViewMaterial sessionId = {this.props.userProfile.session.id} materialsData = {this.props.materialsData} />
                <div className={styles.deleteCompanyBtn} onClick={() => {this.props.deleteMaterial(this.props.materialsData.id)}}>
                    Delete Material
                </div>
            </div>
        )
    }
}

export default DeleteMaterial
