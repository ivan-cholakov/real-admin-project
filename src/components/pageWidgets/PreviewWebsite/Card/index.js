import React, { Component } from 'react';
import styles from './style.module.css';
import { connect } from 'react-redux';
import TextInput from '../../TextInput';
import { addWebsiteIcon } from '../../../../assets/icons/products';
import { isURL } from '../../../common/commonMethods';
import { deleteIcon, editIcon2 } from '../../../../assets/icons/common/icons';
import { triggerNotification } from '../../../common/Notification/actions';
import _ from 'lodash';
import BlueOutlineButton from '../../Buttons/BlueOutline';
import ModalComponent from '../../../common/modal';
import DeleteModal from '../../DeleteModal';
import { generatePreviewUrl, generateEcomPreview, addHttp } from '../generateURLs';
import { Loader } from '../../../common/Loader';

class WebsiteCard extends Component {
    constructor(props) {
        super(props);
        const picUrl = generateEcomPreview(this.props.website.id, this.props.token);
        this.state = {
            picUrl, allowEdit: false, loading: false,
            formData: {
                websiteName: this.props.website.name,
                websiteURL: this.props.website.url
            },
            deleteModal:{
                visible: false,
                modalTitle: 'Delete'
            }
        }
        this.handleAllowEdit = this.handleAllowEdit.bind(this);
        this.handleWebsiteEdit = this.handleWebsiteEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.setPicUrl = _.debounce(this.setPicUrl, 3000);
    }
    setPicUrl = (url) => {
        let picUrl;
        if(url) picUrl = generatePreviewUrl(url, this.props.token);
        else picUrl = url;
        this.setState({picUrl});
        const i = new Image();
        i.src=picUrl;
        i.onload = () => {
            this.setState({loading:false});
        }
    }

    handleDeleteModalChange = (visible) => {
        this.setState({...this.state,
            deleteModal:{
                ...this.state.deleteModal,
                visible
            }
        });
    }

    handleInputChange(val, name, e) {
        if (this.state.allowEdit) {
            
            if (name === 'websiteURL') {
                val = addHttp(val);
                if (isURL(val)) {
                    this.setState({loading:true});
                    this.setPicUrl(val);
                }
                else{
                    this.setState({loading:false});
                }
            }
            this.setState(Object.assign(this.state.formData, { [name]: val }));
        }
        else {
            e.preventDefault();
            // do nothing
        }
    }
    handleAllowEdit() {
        this.setState({ allowEdit: true });
    }
    handleDelete() {
        this.props.handleDeleteWebsite(this.props.website.id);
    }
    handleWebsiteEdit() {
        const url = this.state.formData.websiteURL;
        const name = this.state.formData.websiteName;
        const picUrl = this.state.picUrl;
        const id = this.props.website.id;
        if (url && name && picUrl) {
            const website = {
                id,
                url,
                name,
                picUrl
            };
            this.setState({ allowEdit: false });
            this.props.handleWebsiteChange(website, this.props.website.id);
        }
        else {
            this.props.triggerNotification({ type: 'error', msg: 'Please fill both fields.', duration: 5 });
        }
    }
    render() {
        const allowEdit = this.state.allowEdit;
        const cardClassName = allowEdit? styles.biggerCard : '';
        const contentClassName = allowEdit === false ? styles.disabledEdit : '';
        return (
            <>
                <div className={[styles.cardWrapper,cardClassName].join(' ')}>
                    <div className={styles.icons}>
                        <div className={styles.actionIconContainer} onClick={this.handleAllowEdit}>
                            {editIcon2}
                        </div>
                        <div className={styles.actionIconContainer} onClick={this.handleDeleteModalChange}>
                            {deleteIcon}
                        </div>
                    </div>
                    <div className={[styles.contentContainer, contentClassName].join(' ')}>
                        <div className={styles.left}>
                            <div className={styles.inputContainer}>
                                <TextInput
                                    backgroundStyle={allowEdit ? 'grey' : ''}
                                    label="Website Name"
                                    value={this.state.formData.websiteName}
                                    onChange={(value) => this.handleInputChange(value, 'websiteName')}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <TextInput
                                    backgroundStyle={allowEdit ? 'grey' : ''}
                                    label="Website URL"
                                    value={this.state.formData.websiteURL}
                                    onChange={(value) => this.handleInputChange(value, 'websiteURL')}
                                />
                            </div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.previewBox}>
                                {this.state.loading &&
                                    <div className={styles.loaderContainer}>
                                        <Loader/>
                                    </div>
                                }
                                {(!this.state.picUrl && !this.state.loading) &&
                                    <div className={styles.iconContainer}>
                                        {addWebsiteIcon}
                                    </div>
                                }
                                {(this.state.picUrl && !this.state.loading) &&
                                    <div className={styles.previewImage} style={{ backgroundImage: `url(${this.state.picUrl})` }}>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    {this.state.allowEdit &&
                        <div className={styles.btn}>
                            <BlueOutlineButton
                                icon={'plus'}
                                title={'Save Changes'}
                                onClick={this.handleWebsiteEdit} />
                        </div>
                    }

                </div>
                <div className={styles.line} />
                <ModalComponent
                    destroyOnClose={true}
                    visible={this.state.deleteModal.visible}
                    background={'grey'}
                    handleVisibleChange={this.handleDeleteModalChange}
                    title={this.state.deleteModal.modalTitle}
                    footer={null}
                >
                    <DeleteModal
                        style={{padding: 10}}
                        modalContent={'Are you sure you want to delete?'}
                        handleDelete={() => this.handleDelete()}
                        onModalCancel={() => this.handleDeleteModalChange()}
                        okTitle={'Delete'}
                    />
                </ModalComponent>
            </>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    triggerNotification: (notification) => {
        dispatch(triggerNotification(notification));
    }
});

export default connect(null, mapDispatchToProps)(WebsiteCard)
