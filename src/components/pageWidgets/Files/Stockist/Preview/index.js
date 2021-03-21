import React, { Component } from 'react';
import styles from './style.module.css';
import Heatmap from './containers/heatmap';
import { editIconButton} from '../../../../../assets/icons/common/icons';
import ModalComponent from '../../../../common/modal';
import StockistFile from './containers/stockistFile';

class StockistPreview extends Component {
    constructor(props) {
        super(props);
        this.state={modalVisible: false};
        this.mapContainer = React.createRef();
    }
    handleVisibleChange = (modalVisible) => {
        this.setState({ modalVisible });
    }
    render() {
        return (
            <div className={styles.previewWrapper}>
                <div className={styles.title}>
                    Stockist
                </div>
                <div className={styles.map}>
                    <Heatmap />
                </div>
                <div className={styles.editIconContainer}>
                    <span className={styles.innerIcon} onClick={() => {this.handleVisibleChange(true)}}>
                        {editIconButton} <span> edit </span>
                    </span>
                </div>
                <ModalComponent
                    visible={this.state.modalVisible}
                    destroyOnClose={true}
                    handleVisibleChange={this.handleVisibleChange}
                >
                    <div className={styles.modalContentContainer}>
                        <StockistFile handleVisibleChange={this.handleVisibleChange}/>
                    </div>
                </ModalComponent>
            </div>
        );

    }
}

export default StockistPreview
