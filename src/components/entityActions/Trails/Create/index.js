import React, { Component } from 'react';
import styles from './style.module.css';
import TrailForm from '../Form';
import UploadCroppedPhoto from '../../../../components/pageWidgets/Upload/CroppedPhoto';
import DefaultLayout from '../../../pageWidgets/Upload/CroppedPhoto/DefaultLayout';
class CreateTrail extends Component {
    constructor(props) {
        super(props);
        this.state = { blob: null };
        this.props.setTrailPhoto('');
    }
    handleImageUpdate = (blob) => {
        this.setState({ blob });
        this.props.setTrailPhoto(blob);
    }
    formatData(data) {
        if (!data) {
            data = []
        }

        return data.map((item) => {
            return {
                label: item.name ? item.name : item.companyName,
                value: item.id,
            }
        });
    }

    render() {
        return (
            <div className={styles.componentWrapper}>

                <UploadCroppedPhoto onChange={this.handleImageUpdate} aspect={16 / 9}>
                    <DefaultLayout title={'Add Trail Photo'} value={this.state.blob} />
                </UploadCroppedPhoto>
                <TrailForm
                    resetValidationErrors={this.props.resetValidationErrors}
                    materialsData={this.formatData(this.props.materialsData)}
                    manufacturersData={this.formatData(this.props.manufacturersData)}
                    onFormSubmit={this.props.onFormSubmit}
                    trailData={this.props.trailData}
                    productsList={this.props.productsList}
                    validationErrors={this.props.validationErrors}
                />
            </div>
        )
    }
}



export default CreateTrail
