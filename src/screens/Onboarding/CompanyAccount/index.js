import React, {Component} from 'react';
import styles from './style.module.css';
import TextInput from '../../../components/pageWidgets/TextInput';
import PhoneInput from '../../../components/pageWidgets/PhoneInput';
import UploadCroppedPhoto from '../../../components/pageWidgets/Upload/CroppedPhoto';
import {countries} from '../../../assets/other/countries';
import Footer from '../../../components/layout/Footer';
import UserIcon from '../../../assets/icons/onboarding/user.svg';
import CompanyIcon from '../../../assets/icons/onboarding/company.svg';
import FinishIcon from '../../../assets/icons/onboarding/finish.svg';
import BlueButton from '../../../components/pageWidgets/Buttons/Blue';
import StyledAutoComplete from '../../../components/pageWidgets/AutoComplete';
import WizardSteps from '../../../components/common/WizardSteps';
import OnboardingHeader from '../../../components/layout/OnboardingHeader';
import CustomerNumber from '../../../components/pageWidgets/CustomerNumber';
import SmallerButton from '../../../components/pageWidgets/Upload/CroppedPhoto/SmallerButton';
import SmallWhiteButton from '../../../components/pageWidgets/Buttons/SmallWhite';

class CompanyAccount extends Component {
    constructor(props){
        super(props);
        this.state = {
            formData: {
                phone: { prefix: '+44', number: ''}
            }
        };
    }

    componentDidUpdate() {
        this.props.resetValidationErrors();
    }

    onFieldChange = (value, name) => {
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                [name]: value
            }
        });
    };

    submitCompany = () => {
        this.props.submit(this.state)
    };

    render() {
        return(
            <div className={styles.screenWrapper}>
                <OnboardingHeader
                    title={'Company Account'}
                    userProfile={this.props.userProfile}
                    showUser={true}
                />
                <div className={styles.section}>
                    <WizardSteps
                        currentStep={1}
                        steps={[
                            {title:'User Account', icon: UserIcon, path:'/onboarding/user'},
                            {title:'Company Account', icon: CompanyIcon, path:'/onboarding/company'},
                            {title:'Finish', icon: FinishIcon}
                        ]} 
                    />
                    <div className={styles.formWrapper}>
                        <div className={styles.sectionWrapper}>
                            <h2>Company profile</h2>
                            <div className={styles.columnContainer}>
                                <div className={styles.column + ' ' +styles.column66}>
                                    <TextInput
                                        value={this.state.formData.displayName}
                                        onChange={(val) => {this.onFieldChange(val, 'displayName')}}
                                        backgroundStyle={'grey'}
                                        grayColor={true}
                                        placeholder={'As registered'}
                                        label="Company Name"
                                    />
                                </div>
                                <div className={styles.column + ' ' +styles.column33}>
                                    <div className={styles.upload}>
                                        <UploadCroppedPhoto onChange={(value) => { this.onFieldChange(value, 'logo')}} aspect={16 / 9}>
                                            <SmallerButton label={'ADD COMPANY LOGO'} value={this.state.formData.logo} />
                                        </UploadCroppedPhoto>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.columnContainer}>
                                <TextInput
                                    type={'textarea'}
                                    backgroundStyle={'grey'}
                                    value={this.state.formData.description}
                                    onChange={(val) => {this.onFieldChange(val, 'description')}}
                                    placeholder={'In One Paragraph...'}
                                    label="About The Company"
                                />
                            </div>
                            <div className={styles.columnContainer}>
                                <div className={styles.column}>
                                    <PhoneInput
                                        value={this.state.formData.phone}
                                        onChange={(val) => {this.onFieldChange(val, 'phone')}}
                                        tooltipTitle={'Why?'}
                                        tooltipContent={'lorem ipsum'}
                                        backgroundStyle={'grey'}
                                        options={countries}
                                        label="Contact Number"
                                    />
                                </div>
                                <div className={styles.column}>
                                    <TextInput
                                        tooltipTitle={'Why?'}
                                        tooltipContent={'lorem ipsum'}
                                        backgroundStyle={'grey'}
                                        value={this.state.formData.email}
                                        onChange={(val) => {this.onFieldChange(val, 'email')}}
                                        label="Email"
                                        placeholder="For general queries"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.sectionWrapper}>
                            <h2>Billing information</h2>
                            <div className={styles.columnContainer}>
                                <TextInput
                                    backgroundStyle={'grey'}
                                    grayColor={true}
                                    value={this.state.formData.street}
                                    onChange={(val) => {this.onFieldChange(val, 'street')}}
                                    placeholder={'e.g. 242 Primrose Hill'}
                                    label="Address"
                                />
                            </div>

                            <div className={styles.threeColumnContainer}>
                                <div className={styles.column}>
                                    <TextInput
                                        backgroundStyle={'grey'}
                                        grayColor={true}
                                        value={this.state.formData.city}
                                        onChange={(val) => {this.onFieldChange(val, 'city')}}
                                        placeholder={'e.g. London'}
                                        label="City"
                                    />
                                </div>
                                <div className={styles.column}>
                                    <TextInput
                                        backgroundStyle={'grey'}
                                        grayColor={true}
                                        value={this.state.formData.zipCode}
                                        onChange={(val) => {this.onFieldChange(val, 'zipCode')}}
                                        placeholder={'e.g. W10 6NG'}
                                        label="Postcode"
                                    />
                                </div>
                                <div className={styles.column}>
                                    <StyledAutoComplete
                                        dataSource={countries}
                                        grayColor={true}
                                        backgroundStyle={'grey'}
                                        value={this.state.formData.country}
                                        onChange={(value) => this.onFieldChange(value, 'country')}
                                        placeholder={'e.g. United Kingdom'}
                                        label="Country"
                                    />
                                </div>
                            </div>
                            <div className={styles.columnContainer}>
                                <div className={styles.column}>
                                    <TextInput
                                        tooltipTitle={'Why?'}
                                        tooltipContent={'lorem ipsum'}
                                        backgroundStyle={'grey'}
                                        grayColor={true}
                                        value={this.state.formData.vatNumber}
                                        onChange={(val) => {this.onFieldChange(val, 'vatNumber')}}
                                        placeholder={'Enter'}
                                        label="VAT Number"
                                    />
                                </div>
                                <div className={styles.column}>
                                    <TextInput
                                        tooltipTitle={'Why?'}
                                        tooltipContent={'lorem ipsum'}
                                        backgroundStyle={'grey'}
                                        grayColor={true}
                                        value={this.state.formData.regNumber}
                                        onChange={(val) => {this.onFieldChange(val, 'regNumber')}}
                                        placeholder={'Enter Company House nr'}
                                        label="Company Number"
                                    />
                                </div>
                            </div>

                        </div>

                        <div className={styles.formFooter}>
                            <div className={styles.columnContainer}>
                                <div className={styles.column}>
                                    <CustomerNumber customerNumber={'#EP20987'}/>
                                </div>
                                <div className={styles.column}>
                                    <BlueButton onClick={this.submitCompany} title="NEXT" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.actionsWrapper}>
                        <div className={styles.columnContainer}>
                            <div className={styles.column}>
                                <SmallWhiteButton title={'Invite New Users'}/>
                            </div>
                            <div className={styles.column}>
                                <SmallWhiteButton title={'Add Payment Details'}/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default CompanyAccount
