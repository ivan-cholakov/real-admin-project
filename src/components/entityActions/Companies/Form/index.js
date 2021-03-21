import React, { Component } from 'react';
import styles from './style.module.css';
import TextInput from '../../../pageWidgets/TextInput';
import PhoneInput from '../../../pageWidgets/PhoneInput';
import StyledAutoComplete from '../../../pageWidgets/AutoComplete';
import { countries } from '../../../../assets/other/countries';
import ValidationWarning from '../../../pageWidgets/ValidationWarning';

class CompanyForm extends Component {
    handleChange(name, val) {
        this.props.onFieldChange(name, val);
    }

    render() {
        if (!this.props.validationErrors.contact) this.props.validationErrors.contact = {};
        if (!this.props.validationErrors.address) this.props.validationErrors.address = {};
        return (
            <div className={styles.formWrapper} ref={this.container}>
                <div className={styles.formField}>
                    <TextInput
                        value={this.props.formData.name}
                        onChange={(value) => { this.handleChange('name', value) }}
                        label={'Company Name'}
                    />
                    <ValidationWarning
                        warning={this.props.validationErrors.name}
                    />
                </div>
                <div className={styles.row}>
                    <div className={styles.formField}>
                        <TextInput
                            value={this.props.formData.street}
                            onChange={(value) => { this.handleChange('street', value) }}
                            label={'Street'}
                        />
                        <ValidationWarning
                            warning={this.props.validationErrors.address.street}
                        />
                    </div>
                    <div className={styles.formField}>
                        <TextInput
                            value={this.props.formData.zipCode}
                            onChange={(value) => { this.handleChange('zipCode', value) }}
                            label={'Zip Code'}
                        />
                        <ValidationWarning
                            warning={this.props.validationErrors.address.zipCode}
                        />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.formField}>
                        <TextInput
                            value={this.props.formData.city}
                            onChange={(value) => { this.handleChange('city', value) }}
                            label={'City'}
                        />
                        <ValidationWarning
                            warning={this.props.validationErrors.address.city}
                        />
                    </div>
                    <div className={styles.formField}>
                        <StyledAutoComplete
                            dataSource={countries}
                            grayColor={false}
                            backgroundStyle={'grey'}
                            value={this.props.formData.country}
                            onChange={(value) => this.props.onFieldChange('country', value)}
                            placeholder={'e.g. United Kingdom'}
                            label="Country"
                        />
                        <ValidationWarning
                            warning={this.props.validationErrors.address.country}
                        />
                    </div>
                </div>
                <div className={styles.formField}>
                    <PhoneInput
                        value={{
                            prefix: this.props.formData.phone.prefix || '+44',
                            number: this.props.formData.phone.number
                        }}
                        onChange={(value) => { this.handleChange('phone', value) }}
                        options={countries}
                        label="Contact Number"
                    />
                    <ValidationWarning
                        warning={this.props.validationErrors.contact.phone}
                    />
                </div>
                <div className={styles.formField}>
                    <TextInput
                        value={this.props.formData.email}
                        onChange={(value) => { this.handleChange('email', value) }}
                        label={'Email'}
                    />
                    <ValidationWarning
                        warning={this.props.validationErrors.contact.email}
                    />
                </div>
                <div className={styles.formField}>
                    <TextInput
                        value={this.props.formData.vatNumber}
                        onChange={(value) => { this.handleChange('vatNumber', value) }}
                        label={'VAT Number'}
                    />
                    <ValidationWarning
                        warning={this.props.validationErrors.vatNumber}
                    />
                </div>
                <div className={styles.formField}>
                    <TextInput
                        value={this.props.formData.description}
                        onChange={(value) => { this.handleChange('description', value) }}
                        type={'textarea'}
                        label={'About The Company'}
                    />
                    <ValidationWarning
                        warning={this.props.validationErrors.description}
                    />
                </div>
            </div>
        )
    }
}



export default CompanyForm
