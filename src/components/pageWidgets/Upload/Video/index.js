import React, { Component } from 'react';
import urlParser from 'js-video-url-parser';
import { connect } from 'react-redux';
import styles from './style.module.css';
import { triggerNotification } from '../../../common/Notification/actions';
import UploadFormLayout from '../FormLayout';
import ModalContent from './ModalContent';
import ModalComponent from '../../../common/modal';
import { Avatar } from 'antd';

class UploadVideo extends Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.state = { visible: false, imageUrl: '' };
        this.onUrlChange = this.onUrlChange.bind(this);
        this.handleAddIconClick = this.handleAddIconClick.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);

    }

    isObjectEmpty(obj){
        return Object.values(obj).every(x => (x === null || x === ''));
    }

    componentDidUpdate(prevProps) {
        if(this.isObjectEmpty(this.props.video)){
            return;
        }

        if (prevProps.video !== this.props.video || !this.state.imageUrl) {
            const video = this.props.video;
            try {
                let videoImage;
                if (video.provider == 'youtube') {
                    videoImage = urlParser.create({
                        videoInfo: video,
                        format: 'longImage'
                    });
                } else if (video.provider == 'vimeo') {
                    videoImage = urlParser.create({
                        videoInfo: video,
                        format: 'image',
                        imageWidth: 500
                    });
                } else {
                    this.props.triggerNotification({ type: 'error', msg: 'Unrecognised Video URL', duration: 5 });
                }

                this.setState({
                    imageUrl: videoImage,
                });
            } catch (e) {
                this.props.triggerNotification({ type: 'error', msg: 'Unrecognised Video URL', duration: 5 });
            }
        }
    }

    handleAddIconClick() {
        this.handleVisibleChange(true);
    }
    onUrlChange(video) {
        if(this.isObjectEmpty(video)){
            return;
        }
        try {
            let videoImage;
            if (video.provider == 'youtube') {
                videoImage = urlParser.create({
                    videoInfo: video,
                    format: 'longImage'
                });
            } else if (video.provider == 'vimeo') {
                videoImage = urlParser.create({
                    videoInfo: video,
                    format: 'image',
                    imageWidth: 500
                });
            } else {
                this.props.triggerNotification({ type: 'error', msg: 'Unrecognised Video URL', duration: 5 });
            }
            this.props.onChange(video);
            this.setState({ imageUrl: videoImage });
        } catch (e) {
            this.props.triggerNotification({ type: 'error', msg: 'Unrecognised Video URL', duration: 5 });
        }
    }
    handleVisibleChange(visible) {
        this.setState({ visible });
    }

    render() {
        const backgroundStyle = this.props.backgroundStyle ? styles[this.props.backgroundStyle] : styles.grey;
        const okTitle = this.state.imageUrl ? 'Save' : 'Add';
        return (
            <div className={[styles.uploadVideoContainer, backgroundStyle].join(' ')}>

                {!this.state.imageUrl &&
                    <UploadFormLayout onClick={this.handleAddIconClick} title={'Add Video'} />
                }
                {this.state.imageUrl &&
                    <div className={styles.imageContainer} onClick={this.handleAddIconClick}>
                        <div className={styles.btnContainerEdit}>
                            <Avatar icon={'edit'} /> edit video
                        </div>
                        <img src={this.state.imageUrl} alt="video thumbnail" />
                    </div>
                }
                <ModalComponent
                    visible={this.state.visible}
                    handleVisibleChange={this.handleVisibleChange}
                    title={'Upload Video'}
                    footer={null}
                >
                    <ModalContent
                        okTitle={okTitle}
                        triggerNotification={this.props.triggerNotification}
                        onUrlChange={this.onUrlChange}
                        handleVisibleChange={this.handleVisibleChange}
                    />
                </ModalComponent>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    triggerNotification: (notification) => {
        dispatch(triggerNotification(notification));
    }
});

export default connect(null, mapDispatchToProps)(UploadVideo)
