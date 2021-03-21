import React, { Component } from 'react';
import styles from './style.module.css';
import TextInput from '../../../pageWidgets/TextInput';
import PhoneInput from '../../../pageWidgets/PhoneInput';
import { countries } from '../../../../assets/other/countries';
import StyledAutoComplete from '../../../pageWidgets/AutoComplete';
import BlueButton from '../../../pageWidgets/Buttons/Blue';
import UploadCroppedPhoto from '../../../pageWidgets/Upload/CroppedPhoto';
import CustomerNumber from '../../../pageWidgets/CustomerNumber';
import { Config } from '../../../../core/config';
import { client } from '../../../../core/client';
import SmallerButton from '../../../pageWidgets/Upload/CroppedPhoto/SmallerButton';

const config = new Config();

class Account extends Component {
    constructor(props) {
        super(props)
        const { company } = this.props;
        const logo = company && company.image && `${config.getBaseUrl()}/storage${company.image}?token=${client.auth.getSessionToken()}`
        this.state = {
            id: company && company.id,
            ownerId: company && company.ownerId,
            displayName: company && company.displayName,
            logo: logo,
            description: company && company.description,
            phone: company && company.contact.phone,
            email: company && company.contact.email,
            street: company && company.address.street,
            city: company && company.address.city,
            zipCode: company && company.address.zipCode,
            country: company && company.address.country,
            vatNumber: company && company.vatNumber,
            regNumber: company && company.regNumber,
            image: company && company.image,
        }
    }
    onChange = (name, dialCode, code) => (value) => {
        this.setState({
            ...this.state,
            [name]: value,
            [dialCode]: value,
            [code]: value,
        })
    }
    handleImageChange = (val) => {
        this.setState({logo:val});
    }
    handleSubmit = () => {
        this.props.onSubmit(this.state)
        this.setState({})
    }
    render() {
        return (
            <div className={styles.screenWrapper}>
                <div className={styles.innerContent}>
                    <div className={styles.companyInfo}>
                        <div className={styles.titleContainer}>
                            <h1>Company Profile</h1>
                        </div>
                        <div className={styles.companyRow}>
                            <div className={[styles.left, styles.companyName].join('')} >
                                <TextInput
                                    value={this.state.displayName}
                                    onChange={this.onChange('displayName')}
                                    placeholder={'As registered'}
                                    label={'Company Name'}
                                />
                            </div>

                            <div className={[styles.right, styles.addCompanyLogo].join('')} >
                                <div className={styles.btnContainer}>
                                    <UploadCroppedPhoto onChange={this.handleImageChange} aspect={2.5 / 1}>
                                        <SmallerButton label={'Add Company Logo'} value={this.state.logo} />
                                    </UploadCroppedPhoto>
                                </div>
                            </div>
                        </div>
                        <div className={styles.descriptionContainer}>
                            <TextInput
                                type={'textarea'}
                                value={this.state.description}
                                onChange={this.onChange('description')}
                                placeholder={'In One Paragraph'}
                                label="About The Company"
                            />
                        </div>

                        <div className={[styles.contactInformation, styles.accountPhone].join('')} >
                            <div className={styles.left}>
                                <PhoneInput
                                    value={{
                                        prefix: this.state.phone.prefix || '+44',
                                        number: this.state.phone.number || ''
                                    }}
                                    onChange={this.onChange('phone')}
                                    tooltipTitle={'Why?'}
                                    tooltipContent={'lorem ipsum'}
                                    options={countries}
                                    placeholder={'For general queries'}
                                    label="Contact Number"
                                />
                            </div>
                            <div className={[styles.right].join('')} >
                                <TextInput
                                    value={this.state.email}
                                    onChange={this.onChange('email')}
                                    placeholder={'For general queries'}
                                    label="Email"
                                    tooltipTitle={'Why?'}
                                    tooltipContent={'lorem ipsum'}
                                />
                            </div>
                        </div>
                        <div className={styles.sectionWrapper}>
                            <div className={styles.titleContainer}>
                                <h1>Billing Information</h1>
                            </div>
                            <div className={styles.sectionRow}>
                                <TextInput
                                    value={this.state.street}
                                    onChange={this.onChange('street')}
                                    placeholder={'e.g. 242 Primrose Hill'}
                                    label="Address"
                                />
                            </div>

                            <div className={styles.sectionRow}>
                                <div className={[styles.inputContainer, styles.accountCity].join('')} >
                                    <TextInput
                                        value={this.state.city}
                                        onChange={this.onChange('city')}
                                        placeholder={'e.g. London'}
                                        label="City"
                                    />
                                </div>
                                <div className={[styles.inputContainer, styles.accountZip].join('')} >
                                    <TextInput
                                        value={this.state.zipCode}
                                        onChange={this.onChange('zipCode')}
                                        placeholder={'e.g. W10 6NG'}
                                        label="Postcode"
                                    />
                                </div>
                                <div className={[styles.inputContainer, styles.accountCountry].join('')} >
                                    <StyledAutoComplete
                                        dataSource={countries}
                                        value={this.state.country}
                                        onChange={this.onChange('country')}
                                        placeholder={'e.g. United Kingdom'}
                                        label="Country"
                                    />
                                </div>
                            </div>
                            <div className={styles.sectionRow, styles.vatNumberSection}>
                                <div className={styles.left}>
                                    <TextInput
                                        value={this.state.vatNumber}
                                        tooltipTitle={'Why?'}
                                        tooltipContent={'lorem ipsum'}
                                        onChange={this.onChange('vatNumber')}
                                        placeholder={'Enter'}
                                        label="VAT Number"
                                    />
                                </div>
                                <div className={styles.right}>
                                    <TextInput
                                        value={this.state.regNumber}
                                        tooltipTitle={'Why?'}
                                        tooltipContent={'lorem ipsum'}
                                        onChange={this.onChange('regNumber')}
                                        placeholder={'Enter company house nr'}
                                        label="Company Number"
                                    />
                                </div>
                            </div>

                        </div>

                        <div className={styles.formFooter}>
                            <div className={styles.left}>
                                <CustomerNumber customerNumber={'#EP20987'} />
                            </div>
                            <div className={styles.right}>
                                <BlueButton
                                    title="SAVE"
                                    onClick={this.handleSubmit}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Account;

