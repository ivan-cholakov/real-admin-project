import React, { Component } from 'react';
import styles from './style.module.css';
import UploadCroppedPhoto from '../../components/pageWidgets/Upload/CroppedPhoto';
import TextInput from '../../components/pageWidgets/TextInput';
import BlueButton from '../../components/pageWidgets/Buttons/Blue';
import OnboardingHeader from '../../components/layout/OnboardingHeader';
import ValidationWarning from '../../components/pageWidgets/ValidationWarning';
import SmallThumbnail from '../../components/pageWidgets/Upload/CroppedPhoto/SmallThumbnail';
import placeholderImage from '../../assets/img/add-media.svg';

class InviteCompany extends Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.state = {
            formData: {}
        };
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    componentDidMount() {
        this.props.resetValidationErrors();
        this.container.current.addEventListener('keypress', this.handleKeyPress);
    }
    componentWillUnmount() {
        this.container.current.removeEventListener('keypress', this.handleKeyPress);
    }
    handleKeyPress(e) {
        const key = e.which || e.keyCode;
        if (key === 13) {
            // 13 is enter
            this.handleNextClick();
        }
    }
    async handleNextClick() {
        const email = this.state.formData.email;
        const profileImage = this.state.formData.photo;

        const profile = {
            id: this.state.formData.userId,
            invite: this.state.formData.invite,
            position: this.state.formData.position,
            firstName: this.state.formData.firstName,
            lastName: this.state.formData.lastName,
            contact: {
                email
            }
        };

        const shouldReset = await this.props.invite(profile, profileImage);
        if (shouldReset) {
            this.setState({
                ...this.state,
                formData: {}
            });
        }
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
      const profileImageUrl = placeholderImage;
      return (
          <div className={styles.screenWrapper} ref={this.container}>
              {/* <OnboardingHeader
                    title={'Invite Company Owner'}
                    showUser={!!this.props.userProfile}
                    userProfile={this.props.userProfile}
                    signOut={this.props.signOut}
                    getRoles={this.props.getRoles}
                    changeNavActive={this.props.changeNavActive}
                    changeTitle={this.props.changeTitle}
                /> */}
              <div className={styles.section}>
                  <div className={styles.formWrapper}>
                      <div className={styles.formContainer}>
                          <div className={styles.uploadPhoto}>
                              <UploadCroppedPhoto
                                  onChange={value => {
                                      this.onFieldChange(value, 'photo');
                                  }}
                                  aspect={1 / 1}
                              >
                                  <SmallThumbnail
                                      imagePreviewSrc={profileImageUrl}
                                      imageBlob={this.state.formData.photo}
                                      title={'Add Profile Photo'}
                                  />
                              </UploadCroppedPhoto>
                              <p>Add Picture</p>
                          </div>
                          <div className={styles['flex-row']}>
                              <TextInput
                                  value={this.state.formData.firstName}
                                  backgroundStyle="grey"
                                  onChange={value => {
                                      this.onFieldChange(value, 'firstName');
                                  }}
                                  label="Name"
                              />
                              <div className={styles.spacing} />

                              <TextInput
                                  value={this.state.formData.lastName}
                                  backgroundStyle="grey"
                                  onChange={value => {
                                      this.onFieldChange(value, 'lastName');
                                  }}
                                  label="Last Name"
                              />
                          </div>
                          <div className={styles['flex-row-valid']}>
                              <ValidationWarning
                                  warning={this.props.validationErrors.firstName}
                              />
                              <div className={styles.spacing} />
                              <ValidationWarning
                                  warning={this.props.validationErrors.lastName}
                              />
                          </div>
                          <div className={styles['flex-row']}>
                              <TextInput
                                  value={this.state.formData.position}
                                  placeholder={'e.g. Marketing Manager'}
                                  backgroundStyle="grey"
                                  onChange={value => {
                                      this.onFieldChange(value, 'position');
                                  }}
                                  label="Position"
                              />
                          </div>
                          <div className={styles['flex-row-valid']}>
                              <ValidationWarning
                                  warning={this.props.validationErrors.position}
                              />
                          </div>
                          <div className={styles['flex-row']}>
                              <TextInput
                                  type={'email'}
                                  value={this.state.formData.email}
                                  backgroundStyle="grey"
                                  onChange={value => {
                                      this.onFieldChange(value, 'email');
                                  }}
                                  label="Email"
                              />
                          </div>
                          <ValidationWarning
                              warning={this.props.validationErrors.username}
                          />
                          <div style={{ marginTop: 35 }}>
                              <BlueButton onClick={this.handleNextClick} title="NEXT" />
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      );
  }
}

InviteCompany.defaultProps = {
    validationErrors: {},
    resetValidationErrors: () => {}
};

export default InviteCompany;
