import React, {Component} from 'react';
import styles from './style.module.css';
import ModalFooter from '../../../common/modal/Footer';
import MapComponent from '../../MapComponent';

class MapModalContent extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputValue: this.props.value || ''
        };
    }

    handleChange = (value) => {
        this.setState({inputValue: value})
    };

    handleAdd = () => {
        this.props.handleVisibleChange();
        this.props.onDelete()
    };

    handleCancel = () => {
        this.props.handleVisibleChange();
    };

    render() {
        return(
            <div className={styles.modalContentContainer}>
                <div className={styles.modalContent}>
                    <MapComponent address={this.props.address}/>
                    <ModalFooter
                        cancelTitle = {'Cancel'}
                        okTitle={this.props.okTitle}
                        onSubmit = {this.handleAdd}
                        onCancel = {this.handleCancel}
                    />
                </div>
            </div>
        )
    }
}

export default MapModalContent
