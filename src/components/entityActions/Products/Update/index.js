import React, { Component } from 'react';
import styles from './style.module.css';
import ProductForm from '../Form';
import UploadCroppedPhoto from '../../../../components/pageWidgets/Upload/CroppedPhoto';
import { Config } from '../../../../core/config';
import DefaultLayout from '../../../pageWidgets/Upload/CroppedPhoto/DefaultLayout';

const config = new Config();

const protocol = config.getProtocol();
const host = config.getHost();
const port = config.getPort();
const baseUrl = `${protocol}://${host}:${port}/storage`

class UpdateProduct extends Component {
    constructor(props){
        super(props);
        const { image } = this.props.productData
        const imagePreviewSrc = image ?
            `${baseUrl}${image}?token=${this.props.user.session.id}` :
            '';
        this.state = {blob:imagePreviewSrc};
    }
    handleImageUpdate = (blob) => {
        this.setState({ blob });
        this.props.updateProductPhoto(blob);
    }
    render() {
        
        return (
            <div className={styles.componentWrapper}>

                <UploadCroppedPhoto onChange={this.handleImageUpdate} aspect={16 / 9}>
                    <DefaultLayout title={'Add Photo'} value={this.state.blob}/>
                </UploadCroppedPhoto>
                <ProductForm
                    resetValidationErrors = {this.props.resetValidationErrors}
                    onFormSubmit = {this.props.onFormSubmit}
                    productData = {this.props.productData}
                    brandsList={this.props.brandsList}
                    validationErrors = {this.props.validationErrors}
                />
            </div>
        )
    }
}



export default UpdateProduct
