import React, {Component} from 'react';
import styles from './style.module.css';
import ModalFooter from '../../common/modal/Footer';
import deleteImage from '../../../assets/img/cancel.svg';

class DeleteModal extends Component {

    render() {
        return(
            <div className={styles.modalContentContainer} style={{width: 440}}>
                <div className={styles.modalContent}>
                    <div className={styles.inputContainer}>
                    <img src={deleteImage} alt={''}/>
                    <span className={styles.deleteInfo}>{this.props.modalContent}</span>
                    </div>
                    <ModalFooter
                        cancelTitle = {'Cancel'}
                        okTitle={this.props.okTitle}
                        onSubmit = {() => this.props.handleDelete(this.props.userId)}
                        onCancel = {this.props.onModalCancel}/>
                </div>
            </div>
        )
    }
}

export default DeleteModal
