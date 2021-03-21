import React, { Component } from 'react';
import styles from './style.module.css';
import { client } from '../../../../core/client';
import UserForm from '../Form';
import UploadCroppedPhoto from '../../../../components/pageWidgets/Upload/CroppedPhoto';
import mockImage from '../../../../assets/img/avatar.svg';
import mockCoverImage from '../../../../assets/img/cover-photo.svg';
import { Config } from '../../../../core/config';
import Cover from '../../../pageWidgets/Upload/CroppedPhoto/Cover';
import Thumbnail from '../../../pageWidgets/Upload/CroppedPhoto/Thumbnail';

const config = new Config();

const protocol = config.getProtocol();
const host = config.getHost();
const port = config.getPort();
const baseUrl = `${protocol}://${host}:${port}/storage`;

class UpdateUser extends Component {
    constructor(props) {
        super(props);
        const { coverImage, profileImage } = this.props.userData.data;
        const coverImageUrl = coverImage ?
            `${baseUrl}${coverImage}?token=${client.auth.getSessionToken()}` :
            mockCoverImage;

        const profileImageUrl = profileImage ?
            `${baseUrl}${profileImage}?token=${client.auth.getSessionToken()}`
            : mockImage;
        this.state = { profileImage: profileImageUrl, coverImage: coverImageUrl };
    }

    static getDerivedStateFromProps(props){
        const { coverImage, profileImage } = props.userData.data;
        const profileImageUrl = profileImage ?
            baseUrl + profileImage + '?token=' + client.auth.getSessionToken() :
            null;
        const coverImageUrl = coverImage ?
            baseUrl + coverImage + '?token=' + client.auth.getSessionToken() :
            null;
        return { coverImage: coverImageUrl, profileImage: profileImageUrl };
    }

    handleCoverUpdate = (blob) => {
        this.setState({ coverImage: blob });
        this.props.updateCoverPhoto(blob);
    }
    handleUserImageUpdate = (blob) => {
        this.setState({ profileImage: blob });
        this.props.updateUserPhoto(blob);
    }
    render() {


        return (
            <div className={styles.componentWrapper}>
                <div className={styles.coverImage}>
                    <div className={styles.coverContainer}>
                        <UploadCroppedPhoto onChange={this.handleCoverUpdate} aspect={16 / 9}>
                            <Cover value={this.state.coverImage} />
                        </UploadCroppedPhoto>
                    </div>
                    <div className={styles.thumbnailContainer}>
                        <UploadCroppedPhoto onChange={this.handleUserImageUpdate} aspect={1 / 1}>
                            <Thumbnail value={this.state.profileImage} />
                        </UploadCroppedPhoto>
                    </div>
                </div>
                <UserForm
                    showPassword={this.props.showPassword}
                    changePassword={this.props.changePassword}
                    rolesData={this.props.rolesData}
                    resetValidationErrors={this.props.resetValidationErrors}
                    onFormSubmit={this.props.onFormSubmit}
                    userData={this.props.userData}
                    brandsList={this.props.brandsList}
                    validationErrors={this.props.validationErrors}
                />
            </div>
        )
    }
}



export default UpdateUser
