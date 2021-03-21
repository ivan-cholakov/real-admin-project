import React, { Component } from 'react';
import styles from './style.module.css';
import Footer from '../../../components/layout/Footer';
import UploadCroppedPhoto from '../../../components/pageWidgets/Upload/CroppedPhoto';
import TextInput from '../../../components/pageWidgets/TextInput';
import BlueButton from '../../../components/pageWidgets/Buttons/Blue';
import UserIcon from '../../../assets/icons/onboarding/user.svg';
import CompanyIcon from '../../../assets/icons/onboarding/company.svg';
import FinishIcon from '../../../assets/icons/onboarding/finish.svg';
import WizardSteps from '../../../components/common/WizardSteps';
import OnboardingHeader from '../../../components/layout/OnboardingHeader';
import ValidationWarning from '../../../components/pageWidgets/ValidationWarning';
import { Config } from '../../../core/config';
import placeholderImage from '../../../assets/img/add-media.svg';
import SmallThumbnail from '../../../components/pageWidgets/Upload/CroppedPhoto/SmallThumbnail';

const config = new Config();

const protocol = config.getProtocol();
const host = config.getHost();
const port = config.getPort();
const baseUrl = `${protocol}://${host}:${port}/storage`

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        const userId = props.location.search.split('&')[1].split('=')[1]
        const token = props.location.search.split('&')[0].split('=')[1]
        this.userId = userId;
        this.token = token;
        this.container = React.createRef();
        this.state = {
            formData: {
                userId,
                invite: token,
                password: '',
                photo: ''
            }
        };
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    prefillData() {
        if(!this.state.formData.user) {
            this.setState({
                ...this.state,
                formData: {
                    ...this.state.formData,
                    firstName: this.props.user.firstName,
                    lastName: this.props.user.lastName,
                    email: this.props.user.contact.email,
                    position: this.props.user.position,
                    profileImage: this.props.user.profileImage,
                }
            })
        }
    }
    componentDidMount() {
        this.props.loadUserInfo(this.userId, this.token).then(() => this.prefillData());
        this.props.resetValidationErrors();
        this.container.current.addEventListener('keypress', this.handleKeyPress);
    }
    componentWillUnmount() {
        this.container.current.removeEventListener('keypress', this.handleKeyPress);
    }

    handleKeyPress(e) {
        const key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter - illuminaty confirmed! :D
            this.handleNextClick();
        }
    }
    handleNextClick() {
        const email = this.state.formData.email;
        const profileImage = this.state.formData.photo;

        const profile = {
            id: this.state.formData.userId,
            invite: this.state.formData.invite,
            position: this.state.formData.position,
            password: this.state.formData.password,
            firstName: this.state.formData.firstName,
            lastName: this.state.formData.lastName,
            contact: {
                email
            }
        }
        this.props.register(profile, profileImage);
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

    render() {
        let user = this.state.formData;
        if(!user){
            user = {}
        }

        const profileImageUrl = user.profileImage ? `${baseUrl}/invite${user.profileImage}/?inviteToken=${this.state.formData.invite}` : placeholderImage;
        const steps = [
            {title:'User Account', icon: UserIcon, path:'/onboarding/user'},
        ];
        if (this.props.accountType !== 'employee') {
            steps.push({title:'Company Account', icon: CompanyIcon, path:'/onboarding/company'})
        }
        steps.push({title:'Finish', icon: FinishIcon});
        return (
            <div className={styles.screenWrapper} ref={this.container}>
                <OnboardingHeader title={'User Account'}/>
                <div className={styles.section}>
                    <WizardSteps
                        currentStep={0}
                        steps={steps}
                    />
                    <div className={styles.formWrapper}>
                        <div className={styles.formContainer}>
                            <div className={styles.uploadPhoto}>
                                <UploadCroppedPhoto onChange={(value) => { this.onFieldChange(value, 'photo')}} aspect={1 / 1}>
                                    <SmallThumbnail
                                        imagePreviewSrc={profileImageUrl}
                                        imageBlob={this.state.formData.photo}
                                        title={'Add Profile Photo'}/>
                                </UploadCroppedPhoto>
                                <p>Add Picture</p>
                            </div>
                            <div className={styles['flex-row']}>
                                <TextInput
                                    value={user.firstName}
                                    backgroundStyle="grey"
                                    onChange={(value) => { this.onFieldChange(value, 'firstName') }}
                                    label="Name"
                                />
                                <div className={styles.spacing} ></div>

                                <TextInput
                                    value={user.lastName}
                                    backgroundStyle="grey"
                                    onChange={(value) => { this.onFieldChange(value, 'lastName') }}
                                    label="Last Name"/>
                            </div>
                            <div className={styles['flex-row-valid']}>
                                <ValidationWarning warning={this.props.validationErrors.firstName}/>
                                <div className={styles.spacing} ></div>
                                <ValidationWarning warning={this.props.validationErrors.lastName}/>
                            </div>
                            <div className={styles['flex-row']}>
                                <TextInput
                                    value={user.position}
                                    placeholder={'e.g. Marketing Manager'}
                                    backgroundStyle="grey"
                                    onChange={(value) => { this.onFieldChange(value, 'position') }}
                                    label="Position"
                                />
                            </div>
                            <div className={styles['flex-row']}>
                                <TextInput
                                    type={'email'}
                                    value={user.email}
                                    backgroundStyle="grey"
                                    onChange={(value) => { this.onFieldChange(value, 'email') }}
                                    label="Email"/>
                            </div>
                            <ValidationWarning warning={this.props.validationErrors.username}/>
                            <div className={styles['flex-row']}>
                                <TextInput
                                    type={'password'}
                                    grayColor={true}
                                    value={this.state.formData.password}
                                    backgroundStyle="grey"
                                    onChange={(value) => { this.onFieldChange(value, 'password') }}
                                    label="Password"/>
                            </div>
                            <ValidationWarning warning={this.props.validationErrors.password}/>
                            <div className={styles.nextContainer}>
                                <BlueButton onClick={this.handleNextClick} title="NEXT" />
                            </div>
                                
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default CreateAccount;
