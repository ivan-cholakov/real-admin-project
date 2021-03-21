import React, {Component} from 'react';
import styles from './style.module.css';
import editImage from '../../../assets/icons/adminUsers/edit.svg';
import deleteImage from '../../../assets/icons/adminUsers/delete.svg';
import ModalContent from './ModalContent';
import ModalComponent from '../../common/modal';
import DeleteModal from '../../pageWidgets/DeleteModal';
import _ from 'lodash'

class ProductInfoRow extends Component{

    state = {
        visible: false,
        deleteModal: {
            visible: false,
            title: 'Delete'
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!_.isEqual(prevProps.deleteModal, this.props.deleteModal)){
            this.setState({deleteModal: this.props.deleteModal})
        }
    }

    handleVisibleChange = (visible) => {
        this.setState({visible});
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
        const FormComponent = this.props.formComponent;
        const MapButton = this.props.mapButton;
        return(
            <div>
                <div hidden={this.props.editing} className={styles.rowWrapper}>
                    <span>{this.props.firstColumn}</span>
                    <span>{this.props.secondColumn}</span>
                    <span>{this.props.thirdColumn}</span>
                    <span>{this.props.fourthColumn}</span>
                    <span><MapButton onClick={this.handleVisibleChange} title={'MAP'}/></span>
                    <span>{this.props.fifthColumn}</span>
                    <div className={styles.actions}>
                        <span onClick={this.props.onEdit}>
                            <img src={editImage} alt="" />
                        </span>
                        <span onClick={this.handleDeleteModalChange}>
                            <img src={deleteImage} alt="" />
                        </span>
                    </div>
                </div>

                <FormComponent onSubmit={this.props.onEditSubmit} formData={this.props.formData} visible={this.props.editing} />

                <ModalComponent
                    destroyOnClose={true}
                    visible={this.state.visible}
                    handleVisibleChange={this.handleVisibleChange}
                    title={'MAP'} footer={null}
                >
                    <ModalContent
                        address={this.props.formData.address}
                        okTitle={'Save'}
                        onSubmit={() => this.props.deleteItem(this.props.formData.id)}
                        handleVisibleChange={this.handleVisibleChange}
                    />
                </ModalComponent>

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
                        handleDelete={() => this.props.deleteItem()}
                        onModalCancel={() => this.handleDeleteModalChange()}
                        okTitle={'Delete'}
                    />
                </ModalComponent>
            </div>
        )
    }
}

export default ProductInfoRow
