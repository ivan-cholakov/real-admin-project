import React, { Component } from 'react';
import styles from './style.module.css';
import BrandForm from '../Form';
class CreateBrand extends Component {
    constructor(props) {
        super(props);
        this.state = { blob: null };
        props.setBrandPhoto('');
    }
    handleChange = (blob) => {
        this.setState({ blob });
        this.props.setBrandPhoto(blob);
    }
    render() {
        return (
            <div className={styles.componentWrapper}>
                <BrandForm
                    resetValidationErrors={this.props.resetValidationErrors}
                    onFormSubmit={this.props.onFormSubmit}
                    brandData={this.props.brandData}
                    validationErrors={this.props.validationErrors}
                />
            </div>
        )
    }
}



export default CreateBrand
