import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import styles from './style.module.css';
import { Upload } from 'antd';
import { triggerNotification } from '../../../common/Notification/actions';
import UploadCroppedPhoto from '../CroppedPhoto';
import DefaultLayout from '../CroppedPhoto/DefaultLayout';
import Icon from '../CroppedPhoto/Icon';
import { Avatar } from 'antd';

class UploadPhotos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            previewImage: ''
        };
        this.acceptedFileTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png'
        ];
        this.triggerBtn = React.createRef();

        this.maxCount = this.props.maxCount ? this.props.maxCount : 7;
        this.handleCroppedPhoto = this.handleCroppedPhoto.bind(this);
        this.handleFilesChange = this.handleFilesChange.bind(this);
        this.setFirstImagePreview = this.setFirstImagePreview.bind(this);
        this.checkIfAcceptedFormat = this.checkIfAcceptedFormat.bind(this);
        this.handleFormClick = this.handleFormClick.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
    }
    componentDidMount() {
        if (this.props.photos && this.props.photos.length) {
            const photosCopy = [...this.props.photos, ...[]];
            const updatedFileList = this.updateObjectURLs(photosCopy);
            this.props.onChange(updatedFileList);
            this.setFirstImagePreview();
        }
    }
    componentDidUpdate(prevProps) {
        //set preview URL to first image when it's uploaded.
        if (!prevProps.photos.length && !!this.props.photos.length) {

            this.setFirstImagePreview();
        }
        const preview = this.state.previewImage;
        if (prevProps.photos.length > this.props.photos.length) {
            if (this.props.photos.length !== 0) {
                const match = this.props.photos.find((x) => {
                    return x.url === preview
                })
                if (!match) {
                    //image we're currently previewing was removed. default to preview for first.
                    this.setFirstImagePreview();
                }
            }
            else {
                //all files were removed.
                this.setState({ previewImage: '' });
            }
        }
    }
    updateObjectURLs(filelist) {
        filelist.map((x) => {
            return x.url = URL.createObjectURL(x.originFileObj);
        })
        return filelist;
    }
    setFirstImagePreview() {
        this.setState({ previewImage: this.props.photos[0].url });
    }
    checkIfAcceptedFormat(file) {
        const match = this.acceptedFileTypes.find((x) => {
            return x === file.type;
        })
        if (match) return true;
        return false;
    }
    handleFormClick() {
        this.triggerBtn.current.click();
    }
    handleFilesChange(data) {
        const filelist = [...this.props.photos];
        if (data.file.status === 'removed') {
            //this is a delete.
            const newFilelist = filelist.filter((x) => {
                return x.status !== 'removed'
            })
            // filelist changed here - pass the files to parent.
            this.props.onChange(newFilelist);
        }
        else {
            //this is an upload.
            const accepted = this.checkIfAcceptedFormat(data.file);
            if (accepted) {
                filelist.push(data.file);
                // filelist changed here - pass the files to parent.
                this.props.onChange(filelist);
            }
            else {
                this.props.triggerNotification({ type: 'error', msg: 'Only JPG/JPEG/PNG formats are supported.', duration: 10 });
            }


        }
    }
    handlePreview(file) {
        this.setState({ previewImage: file.url });
    }
    handleCroppedPhoto(blob) {
        const url = URL.createObjectURL(blob);
        const uid = shortid.generate();
        const fileObj = {
            uid,
            name: 'croppedPhotoUpload',
            status: 'done',
            type: blob.type,
            originFileObj: blob,
            url,
            key: uid
        }
        const data = {
            file: fileObj
        }
        this.handleFilesChange(data);
    }

    render() {
        const imgSrc = this.state.previewImage ? this.state.previewImage : '';
        const filesLength = this.props.photos.length;
        const uploadClass = filesLength === 0 || filesLength >= this.maxCount ? styles.hidePreview : styles.uploadContainer;
        return (
            <div className={styles.uploadPhotosContainer}>
                {filesLength === 0 &&
                    <div className={styles.uploadContainer}>
                        <UploadCroppedPhoto aspect={[{title:'Landscape', value: 16 / 9}, {title:'Portrait', value: 9 / 16}]} onChange={this.handleCroppedPhoto}>
                            <DefaultLayout title={this.props.title}/>
                        </UploadCroppedPhoto>
                    </div>
                }
                {filesLength !== 0 &&
                    <div className={styles.previewContainer}>
                        <div className={styles.btnContainerEdit}>
                            <Avatar icon={'edit' } /> edit image
                        </div>
                        <img src={imgSrc} alt="" />
                    </div>

                }
                <Upload
                    listType="picture-card"
                    fileList={this.props.photos}
                    onChange={this.handleFilesChange}
                    className={uploadClass}
                    onPreview={this.handlePreview}
                >
                </Upload>
                {(filesLength < this.maxCount && filesLength !== 0) &&
                    <div className={styles.uploadBtnContainer}>
                        <UploadCroppedPhoto aspect={[{title:'Landscape', value: 16 / 9}, {title:'Portrait', value: 9 / 16}]} onChange={this.handleCroppedPhoto}>
                            <Icon/>
                        </UploadCroppedPhoto>
                    </div>
                }

            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    triggerNotification: (notification) => {
        dispatch(triggerNotification(notification));
    }
});

export default connect(null, mapDispatchToProps)(UploadPhotos)
