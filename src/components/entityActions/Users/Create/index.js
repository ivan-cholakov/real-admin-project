import React, { Component } from 'react';
import styles from './style.module.css';
import UserForm from '../Form';
import UploadCroppedPhoto from '../../../../components/pageWidgets/Upload/CroppedPhoto';
import Thumbnail from '../../../pageWidgets/Upload/CroppedPhoto/Thumbnail';
class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = { blob: null };
        this.props.setUserPhoto('');
    }
    handleImageUpdate = (blob) => {
        this.setState({ blob });
        this.props.setUserPhoto(blob);
    }
    render() {
        return (
            <div className={styles.componentWrapper}>

                <UploadCroppedPhoto onChange={this.handleImageUpdate} aspect={1 / 1}>
                    <Thumbnail title={'Add Photo'} value={this.state.blob} />
                </UploadCroppedPhoto>
                <UserForm
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



export default CreateUser
