import React, { Component } from 'react';
import styles from './style.module.css';
import ProductForm from '../Form';
import UploadCroppedPhoto from '../../../../components/pageWidgets/Upload/CroppedPhoto';
import DefaultLayout from '../../../pageWidgets/Upload/CroppedPhoto/DefaultLayout';
class CreateProduct extends Component {
    constructor(props){
        super(props);
        this.state = {blob:null};
        this.props.setProductPhoto('');
    }
    handleImageUpdate = (blob) => {
        this.setState({ blob });
        this.props.setProductPhoto(blob);
    }
    render() {
        return (
            <div className={styles.componentWrapper}>
                <UploadCroppedPhoto onChange={this.handleImageUpdate} aspect={16 / 9}>
                    <DefaultLayout title={'Add Product Photo'} value={this.state.blob} />
                </UploadCroppedPhoto>
                <ProductForm resetValidationErrors = {this.props.resetValidationErrors} onFormSubmit = {this.props.onFormSubmit} productData = {this.props.productData} brandsList={this.props.brandsList} validationErrors = {this.props.validationErrors}/>
            </div>
        )
    }
}



export default CreateProduct
