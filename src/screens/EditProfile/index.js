import React, { Component } from 'react';
import styles from './style.module.css';
import { Form, Button, Input } from 'antd';
import { debounce } from 'lodash';
import UploadCroppedPhoto from '../../components/pageWidgets/Upload/CroppedPhoto';
import { Config } from '../../core/config';
import Thumbnail from '../../components/pageWidgets/Upload/CroppedPhoto/Thumbnail';
const FormItem = Form.Item;

const config = new Config();

const protocol = config.getProtocol();
const host = config.getHost();
const port = config.getPort();
const baseUrl = `${protocol}://${host}:${port}/storage`

class EditProfile extends Component {
    constructor(props) {
        super(props);
        const { profileImage } = this.props.userProfile;
        const imagePreviewSrc = profileImage ?
            `${baseUrl}${profileImage}?token=${this.props.userProfile.session.id}`
            : '';
        this.state = {imageBlob: imagePreviewSrc};
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.setProfileImageFile = this.setProfileImageFile.bind(this);
        this.saveChanges = debounce(this.saveChanges.bind(this),200);
        this.resetValidationAndSaveChanges = this.resetValidationAndSaveChanges.bind(this);
        this.container = React.createRef();
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.phoneNumberInput = React.createRef();
        this.ageInput = React.createRef();
        this.profileImageContainer = React.createRef();
    }
    componentDidMount() {
        this.container.current.addEventListener('keypress', this.handleKeyPress);
    }
    componentWillUnmount() {
        this.container.current.removeEventListener('keypress', this.handleKeyPress);
    }
    handleKeyPress(e) {
        const key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            this.resetValidationAndSaveChanges();
        }
    }
    setProfileImageFile(blob) {
        this.setState({imageBlob: blob});
        this.props.setProfilePicture(blob);
    }
    saveChanges() {
        const fname = this.firstNameInput.current.input.value;
        const lname = this.lastNameInput.current.input.value;
        const phoneNumber = this.phoneNumberInput.current.input.value;
        const age = this.ageInput.current.input.value;
        this.props.updateProfileInfo(fname, lname, phoneNumber, age, this.props.userProfile.username);
    }
    resetValidationAndSaveChanges() {
        this.props.resetValidationErrors();
        this.saveChanges();
    }
    render() {
        return (
            <div className={styles.pageContent} ref={this.container}>
                <Form>

                    <FormItem>
                        <div className={styles.fieldLabel}>
                            Profile Picture
                        </div>

                        <UploadCroppedPhoto onChange={this.setProfileImageFile} aspect={1 / 1}>
                            <Thumbnail grayColor={true} title={'Add Profile Photo'} value={this.state.imageBlob} />
                        </UploadCroppedPhoto>
                    </FormItem>
                    <FormItem>
                        <div className={styles.fieldLabel}>
                            E-mail
                        </div>
                        <Input disabled placeholder={this.props.userProfile.contact.email} />
                        <div className={styles.warningField}>
                            {this.props.validationErrors.contact ? this.props.validationErrors.contact.email : ''}
                        </div>
                    </FormItem>

                    <FormItem>
                        <div className={styles.fieldLabel}>
                            First Name
                        </div>
                        <Input ref={this.firstNameInput} defaultValue={this.props.userProfile.firstName} />
                        <div className={styles.warningField}>
                            {this.props.validationErrors.firstName}
                        </div>
                    </FormItem>

                    <FormItem>
                        <div className={styles.fieldLabel}>
                            Last Name
                        </div>
                        <Input ref={this.lastNameInput} defaultValue={this.props.userProfile.lastName} />
                        <div className={styles.warningField}>
                            {this.props.validationErrors.lastName}
                        </div>
                    </FormItem>

                    <FormItem>
                        <div className={styles.fieldLabel}>
                            Phone Number
                        </div>
                        <Input ref={this.phoneNumberInput} defaultValue={this.props.userProfile.contact.phone} />
                        <div className={styles.warningField}>
                            {this.props.validationErrors.contact ? this.props.validationErrors.contact.phone : ''}
                        </div>
                    </FormItem>

                    <FormItem>
                        <div className={styles.fieldLabel}>
                            Age
                        </div>
                        <Input ref={this.ageInput} defaultValue={this.props.userProfile.age} />
                        <div className={styles.warningField}>
                            {this.props.validationErrors.age ? this.props.validationErrors.age : ''}
                        </div>
                    </FormItem>
                    <Button className={styles.saveBtn} onClick={this.resetValidationAndSaveChanges}>Save Changes</Button>
                </Form>
            </div>
        )
    }
}

export default EditProfile
