import React, { Component } from 'react';
import styles from './style.module.css';
import { editIcon } from '../../../../../assets/icons/common/icons';
import { Avatar } from 'antd';

class StyledUpload extends Component {
    render() {
        let imagePreview;
        let url = null;
        if (this.props.imageBlob) {
            url = URL.createObjectURL(this.props.imageBlob);
        } else if (this.props.imagePreviewSrc instanceof Blob) {
            url = URL.createObjectURL(this.props.imagePreviewSrc);
        }
        else if ( typeof this.props.imagePreviewSrc === 'function') {
            return (
                <div className={styles.avatarContainer}>
                    <div className={[styles.imageOverlay, this.props.className + 'Overlay'].join(' ')}>
                        <span className={styles.editProfileIconContainer}>{editIcon} Edit</span>
                    </div>
                    {this.props.imagePreviewSrc()}
                </div>
            );
        }
        else if (this.props.imagePreviewSrc) {
            url = this.props.imagePreviewSrc;
        }
        if (url) {
            imagePreview = <Avatar src={url} className={styles.plusIcon} size={this.avatarSize} />

        }
        else {
            imagePreview = <Avatar icon="plus" className={styles.plusIcon} size={this.avatarSize} />
        }
        return (
            <div className={styles.avatarContainer}>
                <div className={[styles.imageOverlay, this.props.className + 'Overlay'].join(' ')}>
                    <span className={styles.editProfileIconContainer}>{editIcon} Edit</span>
                </div>
                {imagePreview}
            </div>
        )
    }
}

export default StyledUpload
