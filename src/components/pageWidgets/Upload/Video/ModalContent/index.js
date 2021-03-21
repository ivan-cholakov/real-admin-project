import React, { Component } from 'react';
import urlParser from 'js-video-url-parser';
import styles from './style.module.css';
import TextInput from '../../../TextInput';
import ValidationWarning from '../../../ValidationWarning';
import ModalFooter from '../../../../common/modal/Footer';
class ModalContent extends Component {
    constructor(props) {
        super(props);


        let videoUrl = '';
        if(props.video){
            videoUrl = urlParser.create({
                videoInfo: props.video,
                format: 'short',
            });
        }
        
        this.container = React.createRef();
        this.state = { inputValue: videoUrl };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    isValidURL(string) {
        // eslint-disable-next-line no-useless-escape
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res == null)
            return false;
        else
            return true;
    }
    handleChange(val) {
        this.setState({ inputValue: val });
    }
    handleCancel() {
        this.props.handleVisibleChange(false);
    }
    async handleAdd() {
        // do stuff
        const url = this.state.inputValue;

        if (this.isValidURL(url)) {
            this.setState({ warning: '' });
            const videoObj = urlParser.parse(url);
            if(videoObj){
                this.props.onUrlChange(videoObj);
                this.props.handleVisibleChange(false);
            } else {
                this.props.triggerNotification({ type: 'error', msg: 'Unrecognised Video URL', duration: 5 });
            }
        }
        else {
            this.setState({ warning: 'Not a valid URL.' });
        }
    }

    render() {
        
        return (
            <div className={styles.modalContentContainer}>
                <div className={styles.modalContent}>
                    <div className={styles.description}>
                        Paste a Vimeo or YouTube URL
                    </div>
                    <div className={styles.inputContainer}>
                        <TextInput backgroundStyle={'grey'} onChange={this.handleChange} placeholder={'Enter URL'} value={this.state.inputValue} />
                        <ValidationWarning warning={this.state.warning} />
                    </div>
                    <ModalFooter cancelTitle = {'Cancel'} okTitle={this.props.okTitle} onSubmit = {this.handleAdd} onCancel = {this.handleCancel}/>
                </div>
            </div>
        );
    }
}
export default ModalContent;
