import React, { Component } from 'react';
import styles from './style.module.css';
import EcomForm from '../Form';
import UploadCroppedPhoto from '../../../../components/pageWidgets/Upload/CroppedPhoto';
import DefaultLayout from '../../../pageWidgets/Upload/CroppedPhoto/DefaultLayout';
class CreateEcom extends Component {
    constructor(props) {
        super(props);
        this.state = { blob: null };
        this.props.setEcomPhoto('');
    }
    handleImageUpdate = (blob) => {
        this.setState({ blob });
        this.props.setEcomPhoto(blob);
    }
    render() {
        return (
            <div className={styles.componentWrapper}>
                <UploadCroppedPhoto onChange={this.handleImageUpdate} aspect={16 / 9}>
                    <DefaultLayout title={'Add Ecom Photo'} value={this.state.blob} />
                </UploadCroppedPhoto>
                <EcomForm
                    resetValidationErrors={this.props.resetValidationErrors}
                    onFormSubmit={this.props.onFormSubmit}
                    ecomData={this.props.ecomData}
                    productsList={this.props.productsList}
                    validationErrors={this.props.validationErrors}
                />
            </div>
        )
    }
}



export default CreateEcom
