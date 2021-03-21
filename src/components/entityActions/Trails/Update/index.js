import React, { Component } from 'react';
import styles from './style.module.css';
import TrailForm from '../Form';
import UploadCroppedPhoto from '../../../../components/pageWidgets/Upload/CroppedPhoto';
import { Config } from '../../../../core/config';
import DefaultLayout from '../../../pageWidgets/Upload/CroppedPhoto/DefaultLayout';

const config = new Config()

const protocol = config.getProtocol()
const host = config.getHost()
const port = config.getPort();
const baseUrl = `${protocol}://${host}:${port}/storage`


class UpdateTrail extends Component {
    constructor(props) {
        super(props);

        const imagePreviewSrc = this.props.trailData.image ?
            `${baseUrl}${this.props.trailData.image}?token=${this.props.user.session.id}` :
            '';
        this.state = { blob: imagePreviewSrc };
    }
    handleImageUpdate = (blob) => {
        this.setState({ blob });
        this.props.updateTrailPhoto(blob);
    }
    formatData(data){
        if(!data){
            data = []
        }
        return data.map( (item) => {
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
                    <DefaultLayout title={'Add Trail Photo'} value={this.state.blob}/>
                </UploadCroppedPhoto>
                <TrailForm
                    resetValidationErrors = {this.props.resetValidationErrors}
                    materialsData={this.formatData(this.props.materialsData)}
                    manufacturersData={this.formatData(this.props.manufacturersData)}
                    onFormSubmit = {this.props.onFormSubmit}
                    productsList={this.props.productsList}
                    trailData = {this.props.trailData}
                    validationErrors = {this.props.validationErrors}
                />
            </div>
        )
    }
}



export default UpdateTrail
