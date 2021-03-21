import React, { Component } from 'react';
import styles from './style.module.css';
import { config } from '../../../../core/client';
import ManufacturerForm from '../Form';
import UploadCroppedPhoto from '../../../../components/pageWidgets/Upload/CroppedPhoto';
import DefaultLayout from '../../../pageWidgets/Upload/CroppedPhoto/DefaultLayout';
class UpdateManufacturer extends Component {
    constructor(props) {
        super(props);

        const imagePreviewSrc = this.props.manufacturerData.image ? `${config.Connection.API_PROTOCOL}://${config.Connection.API_HOST}:${config.Connection.API_PORT}/storage${this.props.manufacturerData.image}?token=${this.props.user.session.id}` : '';
        this.state = { blob: imagePreviewSrc };
        this.props.setManufacturerPhoto('');
    }
    handleImageUpdate = (blob) => {
        this.setState({ blob });
        this.props.updateManufacturerPhoto(blob);
    }
    render() {
        return (
            <div className={styles.componentWrapper}>


                <UploadCroppedPhoto onChange={this.handleImageUpdate} aspect={16 / 9}>
                    <DefaultLayout title={'Add Photo'} value={this.state.blob} />
                </UploadCroppedPhoto>
                <ManufacturerForm
                    resetValidationErrors={this.props.resetValidationErrors}
                    onFormSubmit={this.props.onFormSubmit}
                    manufacturerData={this.props.manufacturerData}
                    brandsList={this.props.brandsList}
                    validationErrors={this.props.validationErrors}
                />
            </div>
        )
    }
}



export default UpdateManufacturer
