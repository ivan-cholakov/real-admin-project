import React, { Component } from 'react';
import styles from './style.module.css';
import { config } from '../../core/client';

class MaterialOverview extends Component {
    render() {
        // display it in an Ant.Design avatar once you figure out how to get served the image
        const imagePreviewSrc = this.props.materialsData.image? `${config.Connection.API_PROTOCOL}://${config.Connection.API_HOST}:${config.Connection.API_PORT}/storage${this.props.materialsData.image}?token=${this.props.sessionId}` : "";
        return (
            <div className={styles.screenWrapper}>
                <div className={styles.fieldLabel}>
                    Name
                </div>
                <div className={styles.fieldValue}>
                    {this.props.materialsData.name}
                </div>

                <div className={styles.fieldLabel}>
                    Description
                </div>
            </div>
        )
    }
}



export default MaterialOverview
