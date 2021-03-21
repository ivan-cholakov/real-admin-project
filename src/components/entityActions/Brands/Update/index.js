import React, { Component } from 'react';
import styles from './style.module.css';
import BrandForm from '../Form';

class UpdateBrand extends Component {
    render() {
        return (
            
            <div className={styles.componentWrapper}>
                <BrandForm
                    resetValidationErrors = {this.props.resetValidationErrors}
                    onFormSubmit = {this.props.onFormSubmit}
                    brandData = {this.props.brandData}
                    validationErrors = {this.props.validationErrors}
                />
            </div>
        )
    }
}



export default UpdateBrand
