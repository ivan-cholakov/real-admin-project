import React, { Component } from 'react';
import styles from './style.module.css';
import { Avatar } from 'antd';


class UploadFormLayout extends Component {
    constructor(props) {
        super(props);
        this.avatarSize = 76;
    }
    render() {
        //defaults to grey.
        const backgroundStyle = this.props.backgroundStyle ? 
            styles[this.props.backgroundStyle] : 
            styles.grey;
        return (
            <div className={[styles.uploadFormWrapper, backgroundStyle].join(' ')}>
                <div className={styles.addIconContainer}>
                    <div className={styles.content}
                        onClick={this.props.onClick}
                    >
                        <Avatar
                            icon={'plus'}
                            className={styles.plusIcon}
                            size={this.props.iconSize ? this.props.iconSize : this.avatarSize}
                        />
                        <div className={styles.formTitle}>
                            {this.props.title}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadFormLayout