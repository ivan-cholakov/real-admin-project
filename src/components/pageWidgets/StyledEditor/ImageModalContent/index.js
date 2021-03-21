import React, {Component} from 'react';
import { client } from '../../../../core/client';
import styles from '../../Upload/Video/ModalContent/style.module.css';
import TextInput from '../../TextInput';
import ModalFooter from '../../../common/modal/Footer';
import UploadCroppedPhoto from '../../Upload/CroppedPhoto';
import ValidationWarning from '../../ValidationWarning';
import BlueButton from '../../../pageWidgets/Buttons/Blue';


class EditorImageModalContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            fileUrl: this.props.value || '' ,
            caption: '' 
        };
    }

    static defaultProps = {
        okTitle: 'Submit'
    }

    handleUrlChange = (value) => {
        this.setState({fileUrl: value});
    };

    handleCaptionChange = (value) => {
        this.setState({caption: value});
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state);
    };

    handleCancel = () => {
        this.props.onCancel();
    };

    onImageChange = async (img) =>{
        const image = new FormData();
        image.append('image', img);
        try {
            const result = await client.utility.uploadImage(image);
            if (result.path) {
                this.setState({fileUrl: result.path});
            } else {
                // TODO: return error toast
                return false;
            }
        } catch (err) {
            return false;
        }
    };

    render() {
        return(
            <div className={styles.modalContentContainer}>
                <div className={styles.modalContent}>
                    <div className={styles.description}>
                        Paste a <span style={{textTransform: 'capitalize'}}>{this.props.type}</span> URL
                    </div>
                    <div className={styles.inputContainer}>
                        <TextInput
                            backgroundStyle={'grey'}
                            onChange={this.handleUrlChange}
                            placeholder={'Enter URL'}
                            value={this.state.fileUrl}
                        />
                        <ValidationWarning
                            warning={this.state.warning}
                        />
                    </div>
                    <div className={styles.description}>
                        or select an image from directory <span style={{textTransform: 'capitalize'}}>{this.props.type}</span>
                    </div>
                    <div className={styles.inputContainer}>
                        <UploadCroppedPhoto onChange={this.onImageChange} aspect={16 / 9}>
                            <BlueButton title='Upload' />
                        </UploadCroppedPhoto>
                    </div>
                    <TextInput
                        backgroundStyle={'grey'}
                        onChange={this.handleCaptionChange}
                        type={'textarea'}
                        placeholder={'Enter Caption'}
                        label={'Image Caption'}
                        value={this.state.caption}
                    />
                    <ModalFooter
                        cancelTitle = {'Cancel'}
                        okTitle={this.props.okTitle}
                        onSubmit = {this.handleSubmit}
                        onCancel = {this.handleCancel}
                    />
                </div>
            </div>
        )
    }
}

export default EditorImageModalContent
