import React, { Component } from 'react';
import styles from './style.module.css';
import { connect } from 'react-redux';
import TextInput from '../TextInput';
import { triggerNotification } from '../../common/Notification/actions';
import mockImg from '../../../assets/img/image-placeholder.svg';
import { isURL } from '../../common/commonMethods';
import WebsiteCard from './Card';
import _ from 'lodash';
import SmallBlueOutline from '../Buttons/SmallBlueOutline';
import { generatePreviewUrl, addHttp } from './generateURLs';
import { Loader } from '../../common/Loader';

class PreviewWebsite extends Component {
    constructor(props) {
        super(props);
        this.state = { formData: {}, picUrl: null, loading: false, productPictureUrl: mockImg, };
        this.newWebsiteEntry = this.newWebsiteEntry.bind(this);
        this.assignIDs = this.assignIDs.bind(this);
        this.setPicUrl = _.debounce(this.setPicUrl, 3000);
    }
    setPicUrl = (url) => {
        let picUrl;
        if (url) picUrl = generatePreviewUrl(url, this.props.token);
        else picUrl = url;
        this.setState({ picUrl })
        const i = new Image();
        i.src = picUrl;
        i.onload = () => {
            this.setState({ loading: false });
        }
    }
    assignIDs(data) {
        const websites = data.map((x, i) => {
            return {
                ...x,
                id: i
            }
        })
        this.props.handleWebsitesChange(websites);
    }
    handleWebsiteChange = (website, id) => {
        const websites = [...this.props.websites, ...[]];
        websites[id] = website;
        this.assignIDs(websites);
        this.props.onUpdate(website);
    }
    handleInputChange(val, name) {
        if (name === 'websiteURL') {

            val = addHttp(val);
            if (isURL(val)) {
                this.setState({ loading: true });
                this.setPicUrl(val);
            }
            else {
                this.setState({ loading: false });
            }
        }
        this.setState(Object.assign(this.state.formData, { [name]: val }));
    }

    handleDeleteWebsite = (id) => {
        const websites = this.props.websites.filter((x) => {
            return x.id !== id;
        })
        this.assignIDs(websites);
        this.props.onDelete(id);
    }
    newWebsiteEntry() {
        const url = this.state.formData.websiteURL;
        const displayName = this.state.formData.websiteName;
        const picUrl = this.state.picUrl;
        if (url && displayName && picUrl) {
            const website = {
                url,
                displayName,
                picUrl
            };
            this.props.onAdd(website);
            this.setState({ formData: {}, picUrl: null });
        }
        else {
            this.props.triggerNotification({ type: 'error', msg: 'Please fill both fields.', duration: 5 });
        }
    }
    render() {
        const imgUrl = this.state.productPictureUrl;

        const btnText = this.props.websites.length !== 0 ? 'Save' : 'New Entry';
        const websites = this.props.websites.map((x) => {
            return <WebsiteCard
                website={x} key={x.url + x.name}
                token={this.props.token}
                handleDeleteWebsite={this.handleDeleteWebsite}
                handleWebsiteChange={this.handleWebsiteChange} />
        })
        return (
            <div className={styles.previewWrapper}>
                <div className={styles.websitesContainer}>
                    {websites}
                </div>
                {this.props.loading &&
                    <div className={styles.loaderCard}>
                        <Loader />
                    </div>
                }
                <div className={styles.contentContainer}>
                    <div className={styles.left}>
                        <div className={styles.inputContainer}>
                            <TextInput
                                label="Website Name"
                                placeholder="Enter"
                                value={this.state.formData.websiteName}
                                onChange={(value) => this.handleInputChange(value, 'websiteName')}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <TextInput
                                label="Page Link"
                                placeholder="Paste a URL"
                                value={this.state.formData.websiteURL}
                                onChange={(value) => this.handleInputChange(value, 'websiteURL')}
                            />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.previewBox}>
                            {this.state.loading &&
                                <div className={styles.loaderContainer}>
                                    <Loader />
                                </div>
                            }
                            {(!this.state.picUrl && !this.state.loading) &&
                                <div className={styles.imgContainer}>
                                    <img src={imgUrl} alt="" />
                                </div>
                            }
                            {(this.state.picUrl && !this.state.loading) &&
                                <div className={styles.previewImage} style={{ backgroundImage: `url(${this.state.picUrl})` }}>
                                </div>
                            }

                        </div>
                    </div>
                </div>
                <div className={styles.btn}>
                    <SmallBlueOutline
                        icon={'plus'}
                        title={btnText}
                        onClick={this.newWebsiteEntry} />
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    triggerNotification: (notification) => {
        dispatch(triggerNotification(notification));
    }
});

export default connect(null, mapDispatchToProps)(PreviewWebsite)
