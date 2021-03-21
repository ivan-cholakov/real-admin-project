import React, { Component } from 'react';
import styles from './style.module.css';
import { editIconButton } from '../../../../../assets/icons/common/icons';
import ModalComponent from '../../../../common/modal';
import EcomFile from './containers/ecomFile';
import { generateEcomPreview } from '../../../PreviewWebsite/generateURLs';
import { connect } from 'react-redux';

class EcomPreview extends Component {
    constructor(props) {
        super(props);
        this.state = { modalVisible: false };
        this.maxShown = 4;
        this.websitesCounter = 0;
    }
    componentDidUpdate(prevProps) {
        if(Object.keys(prevProps.ecomsData).length === 0 && Object.keys(this.props.ecomsData).length !==0){
            this.props.onEcomChange(this.props.ecomsData[0].id);
        }
    }
    handleVisibleChange = (modalVisible) => {
        this.setState({ modalVisible });
    }
    websiteImg = (props) => {
        if(props.index > this.maxShown - 1) {
            return <React.Fragment/>
        }
        this.websitesCounter += 1;
        return (
            <div className={styles.imgContainer}>
                <img alt={''} src={props.imgUrl} />
            </div>
        )
    }
    render() {
        const websitePreviews = this.props.ecomsData.map((x, i) => {
            return (
                <this.websiteImg key={i} index={i} imgUrl={generateEcomPreview(x.id, this.props.token)} />
            )
        })
        return (
            <div className={styles.previewWrapper}>
                <div className={styles.title}>
                    E-com
                </div>
                <div className={styles.websitesContainer}>
                    {websitePreviews}
                </div>
                <div className={styles.counter}>
                    {this.maxShown > websitePreviews.length ? websitePreviews.length : this.maxShown} of {this.props.ecomsData.length}
                </div>
                <div className={styles.editIconContainer}>
                    <span className={styles.innerIcon} onClick={() => { this.handleVisibleChange(true) }}>
                        {editIconButton} <span> edit </span>
                    </span>
                </div>
                <ModalComponent
                    title={'Edit E-com File'}
                    visible={this.state.modalVisible}
                    destroyOnClose={true}
                    handleVisibleChange={this.handleVisibleChange}
                >
                    <div className={styles.modalContentContainer}>
                        <EcomFile handleVisibleChange={this.handleVisibleChange} id={this.props.productId}/>
                    </div>
                </ModalComponent>
            </div>
        );

    }
}

const mapStateToProps = (state) => ({
    token: state.User.userProfile.session.id
});

export default connect(mapStateToProps, null)(EcomPreview);
