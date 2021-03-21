import React, {Component} from 'react';
import facebookGrey from '../../../assets/icons/social/facebook-grey.svg';
import facebookGreen from '../../../assets/icons/social/facebook-green.svg';
import twitterGrey from '../../../assets/icons/social/twitter-grey.svg';
import twitterGreen from '../../../assets/icons/social/twitter-green.svg';
import linkedinGrey from '../../../assets/icons/social/linkedin-grey.svg';
import linkedinGreen from '../../../assets/icons/social/linkedin-green.svg';
import youtubeGrey from '../../../assets/icons/social/yt-grey.svg';
import youtubeGreen from '../../../assets/icons/social/yt-green.svg';
import snapchatGrey from '../../../assets/icons/social/snapchat-grey.svg';
import snapchatGreen from '../../../assets/icons/social/snapchat-green.svg';
import mediumGrey from '../../../assets/icons/social/medium-grey.svg';
import mediumGreen from '../../../assets/icons/social/medium-green.svg';
import styles from './style.module.css';
import ModalContent from './ModalContent';
import ModalComponent from '../../common/modal';

class SocialIcons extends Component {
    state = {
        visible: false,
        title: '',
        type: ''
    }

    handleVisibleChange = (visible) => {
        this.setState({visible});
    }

    render() {
        let formData = this.props.formData;
        return(
            <div className={styles.iconContainer}>
                <div
                    className={styles.icon}
                    onClick={() => this.setState({
                        visible: true,
                        title: 'Add facebook url',
                        type: 'facebook',
                        value: formData.facebook
                    })} 
                >
                    <img src={(this.props.formData.facebook)? facebookGreen: facebookGrey} 
                        onMouseOver={e => (e.currentTarget.src = facebookGreen)}
                        onMouseOut={e => (e.currentTarget.src = (this.props.formData.facebook)? facebookGreen : facebookGrey)}                       
                        alt=""/>
                </div>
                <div
                    className={styles.icon}
                    onClick={() => this.setState({
                        visible: true,
                        title: 'Add twitter url',
                        type: 'twitter',
                        value: formData.twitter
                    })}
                >
                    <img src={(this.props.formData.twitter)? twitterGreen : twitterGrey} 
                        onMouseOver={e => (e.currentTarget.src = twitterGreen)}
                        onMouseOut={e => (e.currentTarget.src = (this.props.formData.twitter)? twitterGreen : twitterGrey)}                       
                        alt=""/>
                </div>
                <div
                    className={styles.icon}
                    onClick={() => this.setState({
                        visible: true,
                        title: 'Add linkedin url',
                        type: 'linkedin',
                        value: formData.linkedin
                    })}>
                    <img src={(this.props.formData.linkedin)? linkedinGreen : linkedinGrey} 
                        onMouseOver={e => (e.currentTarget.src = linkedinGreen)}
                        onMouseOut={e => (e.currentTarget.src = (this.props.formData.linkedin)? linkedinGreen : linkedinGrey)}                    
                        alt=""/>
                </div>
                <div
                    className={styles.icon}
                    onClick={() => this.setState({
                        visible: true,
                        title: 'Add youtube url',
                        type: 'youtube',
                        value: formData.youtube
                    })}>
                    <img src={(this.props.formData.youtube)? youtubeGreen : youtubeGrey} 
                        onMouseOver={e => (e.currentTarget.src = youtubeGreen)}
                        onMouseOut={e => (e.currentTarget.src = (this.props.formData.youtube)? youtubeGreen : youtubeGrey)}                       
                        alt=""/>
                </div>
                <div
                    className={styles.icon}
                    onClick={() => this.setState({
                        visible: true,
                        title: 'Add snapchat url',
                        type: 'snapchat',
                        value: formData.snapchat
                    })}>
                    <img src={(this.props.formData.snapchat)? snapchatGreen : snapchatGrey} 
                        onMouseOver={e => (e.currentTarget.src = snapchatGreen)}
                        onMouseOut={e => (e.currentTarget.src = (this.props.formData.snapchat)? snapchatGreen : snapchatGrey)}                       
                        alt=""/>
                </div>
                <div
                    className={styles.icon}
                    onClick={() => this.setState({
                        visible: true,
                        title: 'Add medium url',
                        type: 'medium',
                        value: formData.medium
                    })}>
                    <img src={(this.props.formData.medium)? mediumGreen : mediumGrey}  
                        onMouseOver={e => (e.currentTarget.src = mediumGreen)}
                        onMouseOut={e => (e.currentTarget.src = (this.props.formData.medium)? mediumGreen : mediumGrey)}                       
                        alt=""/>
                </div>
                <ModalComponent
                    destroyOnClose={true}
                    visible={this.state.visible}
                    handleVisibleChange={this.handleVisibleChange}
                    title={this.state.title} footer={null}
                >
                    <ModalContent
                        type={this.state.type}
                        value={this.state.value}
                        onFieldChange={this.props.onFieldChange}
                        okTitle={'Save'}
                        imageUrl={this.state.imageUrl}
                        triggerNotification = {this.props.triggerNotification}
                        handleNewUrl={this.handleNewUrl}
                        handleVisibleChange={this.handleVisibleChange}
                    />
                </ModalComponent>
            </div>
        );
    }
}

export default SocialIcons;
