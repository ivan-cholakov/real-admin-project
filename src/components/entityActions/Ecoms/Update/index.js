import React, { Component } from 'react';
import styles from './style.module.css';
import EcomForm from '../Form';
import UploadCroppedPhoto from '../../../../components/pageWidgets/Upload/CroppedPhoto';
import { Config } from '../../../../core/config';
import DefaultLayout from '../../../pageWidgets/Upload/CroppedPhoto/DefaultLayout';

const config = new Config();

const protocol = config.getProtocol();
const host = config.getHost();
const port = config.getPort();
const baseUrl = `${protocol}://${host}:${port}/storage`

class UpdateEcom extends Component {
    constructor(props){
        super(props);
        const { image } = this.props.ecomData;
        const imagePreviewSrc = image ?
            `${baseUrl}${image}?token=${this.props.user.session.id}` :
            '';
        this.state = {blob: imagePreviewSrc};
    }

    handleImageUpdate = (blob) => {
        this.setState({blob});
        this.props.updateEcomPhoto(blob);
    }
    render() {
        
        return (
            <div className={styles.componentWrapper}>
                <UploadCroppedPhoto onChange={this.handleImageUpdate} aspect={16 / 9}>
                    <DefaultLayout title={'Add Photo'} value={this.state.blob}/>
                </UploadCroppedPhoto>
                <EcomForm
                    resetValidationErrors = {this.props.resetValidationErrors}
                    onFormSubmit = {this.props.onFormSubmit}
                    ecomData = {this.props.ecomData}
                    productsList={this.props.productsList}
                    validationErrors = {this.props.validationErrors}
                />
            </div>
        )
    }
}



export default UpdateEcom
