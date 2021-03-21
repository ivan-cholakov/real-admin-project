import React, { Component } from 'react';
import styles from './style.module.css';
import StockistForm from '../Form';
import UploadCroppedPhoto from '../../../../components/pageWidgets/Upload/CroppedPhoto';
import DefaultLayout from '../../../pageWidgets/Upload/CroppedPhoto/DefaultLayout';
class CreateStockist extends Component {
    constructor(props) {
        super(props);
        this.state = { blob: null };
        this.props.setStockistPhoto('');
    }
    handleImageUpdate = (blob) => {
        this.setState({ blob });
        this.props.setStockistPhoto(blob);
    }
    render() {
        return (
            <div className={styles.componentWrapper}>

                <UploadCroppedPhoto onChange={this.handleImageUpdate} aspect={16 / 9}>
                    <DefaultLayout title={'Add Stockist Photo'} value={this.state.blob} />
                </UploadCroppedPhoto>
                <StockistForm
                    resetValidationErrors={this.props.resetValidationErrors}
                    onFormSubmit={this.props.onFormSubmit}
                    stockistData={this.props.stockistData}
                    productsList={this.props.productsList}
                    validationErrors={this.props.validationErrors}
                />
            </div>
        )
    }
}



export default CreateStockist
