import React, { Component } from 'react';
import styles from './style.module.css';
import MaterialForm from '../Form';
import UploadCroppedPhoto from '../../../../components/pageWidgets/Upload/CroppedPhoto';
import DefaultLayout from '../../../pageWidgets/Upload/CroppedPhoto/DefaultLayout';
class CreateMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = { blob: null };
        this.props.setMaterialPhoto('');
    }

    handleImageUpdate = (blob) => {
        this.setState({ blob });
        this.props.setMaterialPhoto(blob);
    }
    render() {
        return (
            <div className={styles.componentWrapper}>

                <UploadCroppedPhoto onChange={this.handleImageUpdate} aspect={16 / 9}>
                    <DefaultLayout title={'Add Photo'} value={this.state.blob} />
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



export default CreateMaterial
