import React, { Component } from 'react';
import styles from './style.module.css';
import CompanyForm from '../Form';
class CreateCompany extends Component {
    constructor(props) {
        super(props);
        props.setCompanyPhoto('');
    }
    render() {

        return (
            <div className={styles.componentWrapper}>
                <CompanyForm
                    resetValidationErrors={this.props.resetValidationErrors}
                    onFormSubmit={this.props.onFormSubmit}
                    companyData={this.props.companyData}
                    validationErrors={this.props.validationErrors}
                />
            </div>
        )
    }
}



export default CreateCompany
