import React, { Component } from 'react';
import styles from './style.module.css';
import Div100vh from 'react-div-100vh';
import BlueButton from '../../../pageWidgets/Buttons/Blue';
import CustomerNumber from '../../../pageWidgets/CustomerNumber';
import { Config } from '../../../../core/config';

const config = new Config();

const protocol = config.getProtocol();
const host = config.getHost();
const port = config.getPort();
const baseUrl = `${protocol}://${host}:${port}/storage`

class CompanyOverview extends Component {
    constructor(props) {
        super(props);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    handleEditClick() {
        this.props.openDrawer({ action: 'update', type: 'company', title: 'Edit Company', className: 'userDrawer' })
    }
    render() {
        let image;
        if(this.props.companyData.image){
            image = this.props.companyData.image;
        }
        const imagePreviewSrc = image ?
            `${baseUrl}${image}?token=${this.props.userProfile.session.id}` :
            '';
        let address = '';
        if (this.props.companyData.address.street) address += this.props.companyData.address.street + ', ';
        if (this.props.companyData.address.city) address += this.props.companyData.address.city + ' ';
        if (this.props.companyData.address.zipCode) address += this.props.companyData.address.zipCode + ', ';
        if (this.props.companyData.address.country) address += this.props.companyData.address.country;

        //hi
        return (
            <Div100vh>
                <div className={styles.componentWrapper}>
                    <div className={styles.top}>
                        {imagePreviewSrc &&
                            <div className={styles.imageContainer}>
                                <img src={imagePreviewSrc} alt="company logo" />
                            </div>
                        }
                        {!imagePreviewSrc &&
                            <div className={styles.noImage}>
                                No Company Image.
                            </div>
                        }

                        <div className={styles.mainContent}>
                            <div className={styles.companyInfo}>
                                <div className={styles.companyName}>
                                    {this.props.companyData.displayName}
                                </div>
                                <div className={styles.companyInfoRow}>
                                    {address}
                                </div>
                                <div className={styles.companyInfoRow}>
                                    {this.props.companyData.vatNumber}
                                </div>

                                <div className={styles.companyInfoRow}>
                                    {this.props.companyData.contact.phone.number}
                                </div>
                                <div className={styles.companyInfoRow}>
                                    {this.props.companyData.contact.email}
                                </div>
                            </div>

                            <div className={styles.description}>
                                {this.props.companyData.description}
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.actions}>
                            <div className={styles.btnContainer}>
                                <BlueButton title={'EDIT'} onClick={this.handleEditClick} />
                            </div>
                            <div className={styles.openPanel}>
                                <span>
                                    Open Admin Panel
                                </span>
                            </div>
                        </div>
                        <div className={styles.customerNumberContainer}>
                            <CustomerNumber customerNumber={'#EP20987'} />
                        </div>
                    </div>
                </div>
            </Div100vh>
        )
    }
}



export default CompanyOverview
