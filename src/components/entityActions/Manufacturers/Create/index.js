import React, { Component } from 'react';
import styles from './style.module.css';
import ManufacturerForm from '../Form';
import UploadCroppedPhoto from '../../../../components/pageWidgets/Upload/CroppedPhoto';
import DefaultLayout from '../../../pageWidgets/Upload/CroppedPhoto/DefaultLayout';
class CreateManufacturer extends Component {
    constructor(props) {
        super(props);
        this.state = { blob: null };
        this.props.setManufacturerPhoto('');
    }
    handleImageUpdate = (blob) => {
        this.setState({ blob });
        this.props.setManufacturerPhoto(blob);
    }
    render() {
        return (
            <div className={styles.componentWrapper}>
                <UploadCroppedPhoto onChange={this.handleImageUpdate} aspect={16 / 9}>
                    <DefaultLayout title={'Add Photo'} value={this.state.blob}/>
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
export default CreateManufacturer
