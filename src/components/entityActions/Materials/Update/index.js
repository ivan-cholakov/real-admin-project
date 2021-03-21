import React, { Component } from 'react';
import styles from './style.module.css';
import { config } from '../../../../core/client';
import MaterialForm from '../Form';
import UploadCroppedPhoto from '../../../../components/pageWidgets/Upload/CroppedPhoto';
import DefaultLayout from '../../../pageWidgets/Upload/CroppedPhoto/DefaultLayout';
class UpdateMaterial extends Component {
    constructor(props) {
        super(props);

        const imagePreviewSrc = this.props.materialData.image ? `${config.Connection.API_PROTOCOL}://${config.Connection.API_HOST}:${config.Connection.API_PORT}/storage${this.props.materialData.image}?token=${this.props.user.session.id}` : '';
        this.state = { blob: imagePreviewSrc };
    }
    handleImageUpdate = (blob) => {
        this.setState({ blob });
        this.props.updateMaterialPhoto(blob);
    }
    render() {
        return (
            <div className={styles.componentWrapper}>

                <UploadCroppedPhoto onChange={this.handleImageUpdate} aspect={16 / 9}>
                    <DefaultLayout title={'Add Material Photo'} value={this.state.blob} />
                </UploadCroppedPhoto>
                <MaterialForm
                    resetValidationErrors={this.props.resetValidationErrors}
                    onFormSubmit={this.props.onFormSubmit}
                    materialData={this.props.materialData}
                    brandsList={this.props.brandsList}
                    validationErrors={this.props.validationErrors}
                />
            </div>
        )
    }
}



export default UpdateMaterial
