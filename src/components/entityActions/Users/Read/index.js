import React, { Component } from 'react';
import styles from './style.module.css';
import ViewUser from '../../../pageWidgets/ViewUser';
import UploadCroppedPhoto from '../../../pageWidgets/Upload/CroppedPhoto';
import { client } from '../../../../core/client';
import { Config } from '../../../../core/config';
import Cover from '../../../pageWidgets/Upload/CroppedPhoto/Cover';
import Thumbnail from '../../../pageWidgets/Upload/CroppedPhoto/Thumbnail';

const config = new Config();

const protocol = config.getProtocol();
const host = config.getHost();
const port = config.getPort();
const baseUrl = `${protocol}://${host}:${port}/storage`

class ReadUser extends Component {
    constructor(props) {
        super(props);
        const { coverImage, profileImage } = this.props.userProfile;
        const profileImageUrl = profileImage ?
            baseUrl + profileImage + '?token=' + client.auth.getSessionToken() :
            null;
        const coverImageUrl = coverImage ?
            baseUrl + coverImage + '?token=' + client.auth.getSessionToken() :
            null;
        this.state = { coverImage: coverImageUrl, profileImage: profileImageUrl };
    }

    static getDerivedStateFromProps(props){
        const { coverImage, profileImage } = props.userProfile;
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
                
                <UploadCroppedPhoto onChange={this.handleCoverUpdate} aspect={16 / 9}>
                    <Cover value={this.state.coverImage}/>
                </UploadCroppedPhoto>
                <div className={styles.thumbnailContainer}>
                    <UploadCroppedPhoto onChange={this.handleUserImageUpdate} aspect={1/1}>
                        <Thumbnail title={'Add Profile Photo'} value={this.state.profileImage}/>
                    </UploadCroppedPhoto>
                </div>
                <ViewUser
                    sessionId={this.props.userProfile.session.id}
                    userData={this.props.userData}
                />
            </div>
        )
    }
}



export default ReadUser
