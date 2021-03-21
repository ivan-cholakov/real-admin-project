import React, { Component } from 'react';
import styles from './style.module.css';
import CompanyForm from '../Form';
import UploadCroppedPhoto from '../../../pageWidgets/Upload/CroppedPhoto';
import Div100vh from 'react-div-100vh';
import BlueButton from '../../../pageWidgets/Buttons/Blue';
import CustomerNumber from '../../../pageWidgets/CustomerNumber';
import { Config } from '../../../../core/config';
import Cover from '../../../pageWidgets/Upload/CroppedPhoto/Cover';

const config = new Config();

const protocol = config.getProtocol();
const host = config.getHost();
const port = config.getPort();
const baseUrl = `${protocol}://${host}:${port}/storage`

class UpdateCompany extends Component {
    constructor(props){
        super(props);
        this.state = {
            blob: null,
            company: {},
            formData:{}
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleImageUpdate = this.handleImageUpdate.bind(this);
        this.container = React.createRef();
        const company = this.props.companiesData;
        this.state.company = company;
        this.state.formData = {
            name: company.displayName,
            description: company.description,
            vatNumber: company.vatNumber,
            street: company.address.street,
            zipCode: company.address.zipCode,
            city: company.address.city,
            country: company.address.country,
            email: company.contact.email,
            phone: company.contact.phone
        };
        const { image } = this.state.company;
        const imagePreviewSrc = image ?
            `${baseUrl}${image}?token=${this.props.userProfile.session.id}` :
            '';
        this.state.blob = imagePreviewSrc;
        this.state.image = image;
        
    }
    componentDidMount() {
        this.props.resetValidationErrors();
    }
    componentWillUnmount() {
    }
    componentDidUpdate(prevProps){
        if(this.props.selectedCompany !== prevProps.selectedCompany) {
            const company = this.props.companiesData.data.find((x) => {
                return x.name === this.props.selectedCompany;
            })
            this.setState({company});
        }
    }
    onFieldChange = (name, value) => {
        const formData = this.state.formData;
        formData[name] = value;
        this.setState({formData});
    };
    handleFormSubmit() {
        const company = {
            image: this.state.image,
            displayName: this.state.formData.name,
            description: this.state.formData.description,
            vatNumber: this.state.formData.vatNumber,
            address: {
                street: this.state.formData.street,
                zipCode: this.state.formData.zipCode,
                city: this.state.formData.city,
                country: this.state.formData.country
            },
            contact: {
                email: this.state.formData.email,
                phone: this.state.formData.phone
            }
        };
        this.props.onFormSubmit(this.props.userProfile, company, this.state.company.id);
    }
    handleImageUpdate = async (blob) => {
        this.setState({blob});
        const res = await this.props.updateCompanyPhoto(blob);
        const image = res.action.payload.identifier;
        this.setState({image});
    }
    render() {
        return (
            <Div100vh>
                <div
                    className={styles.componentWrapper}
                    ref={this.container}
                >
                    
                    <div className={styles.mainContent}>
                        <UploadCroppedPhoto onChange={this.handleImageUpdate} aspect={16 / 9}>
                            <Cover value={this.state.blob} />
                        </UploadCroppedPhoto>
                        <div className={styles.formWrapper}>
                            <CompanyForm
                                formData={this.state.formData}
                                onFieldChange={this.onFieldChange}
                                resetValidationErrors={this.props.resetValidationErrors}
                                validationErrors={this.props.validationErrors}
                            />
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.actions}>
                            <div className={styles.btnContainer}>
                                <BlueButton
                                    title={'SAVE'}
                                    onClick={this.handleFormSubmit}
                                />
                            </div>
                            <div className={styles.openPanel}>
                                <span>
                                    Open Admin Panel
                                </span>
                            </div>
                        </div>
                        <div className={styles.customerNumberContainer}>
                            <CustomerNumber customerNumber={'#EP20987'}/>
                        </div>
                    </div>
                </div>
            </Div100vh>
        )
    }
}



export default UpdateCompany
