import React, {Component} from 'react';
import styles from './style.module.css';
import StatusComponent from '../StatusComponent';
import deleteIcon from '../../../assets/icons/adminUsers/delete.svg'
import ModalComponent from '../../common/modal';
import DeleteModal from '../DeleteModal';
import _ from 'lodash';
import {imageMap} from '../../sections/AddNew/Product/Tabs/About/certifications'

class CertificationLabel extends Component {

    state = {
        deleteModal: {
            visible: false,
            title: 'Delete'
        }
    }

    componentDidUpdate(prevProps) {
        if(!_.isEqual(prevProps.deleteModal, this.props.deleteModal)){
            this.setState({deleteModal: this.props.deleteModal})
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

    render() {
        return(
            <div className={styles.wrapper, styles.certificationWrapper}>
                <div className={styles.certificationButton} onClick={this.props.onClick}>
                    <img alt={''} src={imageMap[this.props.icon]}/>
                    <span>{this.props.label}</span>
                </div>
                <StatusComponent active={this.props.active}/>
                <div className={styles.deleteIcon} onClick={this.handleDeleteModalChange}>
                    <img src={deleteIcon} alt=""/>
                </div>

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
                        handleDelete={() => this.props.onDelete()}
                        onModalCancel={() => this.handleDeleteModalChange()}
                        okTitle={'Delete'}
                    />
                </ModalComponent>

            </div>
        )
    }
}

export default CertificationLabel;
