import React, { Component } from 'react';
import shortid from 'shortid';
import styles from './style.module.css';
import FormsSection from '../../../pageWidgets/FormsSection';
import SectionTitle from '../../../pageWidgets/SectionTitle';
import TimeSpan from '../../../pageWidgets/TimeSpan';
import mockImg from '../../../../assets/img/image-placeholder.svg';
import CustomDropdown from '../../../pageWidgets/Dropdown';
import { plus } from '../../../../assets/icons/sideNavigation/addAssets/icons';
import IconButton from '../../../pageWidgets/Buttons/Icon';
import StyledDatePicker from '../../../pageWidgets/DatePicker';
import TextInput from '../../../pageWidgets/TextInput';
import { Config } from '../../../../core/config';
import ProductScore from '../../../pageWidgets/ProductScore';
import CertificationBadge from '../../../pageWidgets/CertificateBadge';
import { client } from '../../../../core/client';

const config = new Config();

const protocol = config.getProtocol();
const host = config.getHost();
const port = config.getPort();
const baseUrl = `${protocol}://${host}:${port}/storage`;

class BatchData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productPictureUrl: mockImg,
        };
        this.formatProductData = this.formatProductData.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
    }
    componentDidUpdate(prevProps){
        if(prevProps.formData.productId !== this.props.formData.productId) {
            this.handleProductChange(this.props.formData.productId)
        }
    }

    formatProductData(){
        return this.props.brandsData.map( (brand) => {
            return {
                label: brand.displayName,
                value: brand.id,
                children: this.props.productsData
                    .filter(product => product.brandId === brand.id)
                    .map( (product) => ({
                        label: {
                            text: product.displayName,
                            image: '/storage'+product.mainImage
                        },
                        value: product.id
                    }))
            }
        });
    }

    handleProductChange = async (val) => {
        const match = this.props.productsData.find((x) => {
            return x.id === val;
        })

        if(match) {
            let nextBatchId = await client.batch.count(match.id);
            nextBatchId=nextBatchId+1+'';
            this.props.onFieldChange('number', nextBatchId)
            if(match.mainImage){
                const productPictureUrl = `${baseUrl}${match.mainImage}?token=${this.props.sessionId}`;
                this.setState({
                    productPictureUrl
                });
            }else {
                this.setState({
                    productPictureUrl: mockImg
                });
            }
        }
        this.props.onFieldChange('productId', val);
    };

    hanldeOpenNewProductModal = () => {
        
    }

    render() {
        const imgUrl = this.state.productPictureUrl;
        return (
            <FormsSection backgroundStyle="grey">
                <div className={styles.batchWrapper}>
                    <div className={styles.batchFirstSection}>
                        <div className={styles.batchFormContainer}>
                            <div>
                                <div className={styles.titleContainer}>
                                    <SectionTitle title="Batch Data" />
                                </div>
                                <div className={styles.inputContainer}>
                                    <div className={styles.selectContainer} style={{width: '100%'}}>
                                        <CustomDropdown
                                            underlined = {true}
                                            value={this.props.formData.productId}
                                            onChange={(value) => { this.handleProductChange(value)}}
                                            label="Product"
                                            placeholder={'Select'}
                                            items={this.formatProductData()}
                                        />
                                    </div>
                                    <div
                                        className={styles.btnContainer}
                                        onClick={this.hanldeOpenNewProductModal}
                                    >
                                        <IconButton small={true} icon={plus} title={'new'}/>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.scoreContainer}>
                                <div className={styles.scoreWrapper}>
                                    <ProductScore bigText={'768'} smallText={'Product score'}/>
                                </div>
                                <div className={styles.iconWrapper}>
                                    <div className={styles.certificateIcons}>
                                        {this.props.selectedProduct.certificates &&
                                            this.props.selectedProduct.certificates.filter((certificate, index) => index < 3 ).map(certificate => {
                                                return <CertificationBadge key={shortid.generate()} icon={certificate.type}/>
                                            }
                                            )}
                                    </div>
                                </div>
                            </div>
                            <div className={[styles.batchInputContainer, styles.inputContainer].join(' ')}>
                                <TextInput
                                    style={{textAlign: 'center', transition: '0.6s'}}
                                    border={'solid 1px rgba(172,172,172,0.2)'}
                                    disabled={this.props.disabled}
                                    onChange={(val) => {this.props.onFieldChange('name', val)}}
                                    value={this.props.formData.name}
                                    label="Batch Name"
                                />
                            </div>

                        </div>
                        <div className={styles.imgContainer}>
                            <img src={imgUrl} alt="" />
                        </div>
                    </div>
                    <div className={styles.additionalInfo}>

                        <div className={[styles.batchIDContainer, styles.inputContainer].join(' ')}>
                            <TextInput
                                type={'id'}
                                disabled={this.props.disabled}
                                value={this.props.formData.number}
                                onChange={(val) => {this.props.onFieldChange('number', val)}}
                                label="Batch ID"
                                style={{background: '#fff'}}
                            />
                        </div>
                        <div className={[styles.amountContainer, styles.inputContainer].join(' ')}>
                            <TextInput
                                type={'number'}
                                disabled={this.props.disabled}
                                value={this.props.formData.itemsCount}
                                onChange={(val) => {this.props.onFieldChange('itemsCount', parseInt(val))}}
                                label="Total Units"
                                placeholder={'Enter amount'}
                            />
                        </div>
                        <div className={[styles.datePickerContainer, styles.inputContainer].join(' ')}>
                            <StyledDatePicker
                                disabled={this.props.disabled}
                                value={this.props.formData.startDate}
                                onChange={(value) => { this.props.onFieldChange('startDate', value) }}
                                label={'Estimated Prod Date'}
                                placeholder={'DD/MM/YY'}
                            />
                        </div>
                        <div className={[styles.combinedInputContainer, styles.inputContainer].join(' ')}>
                            <TimeSpan
                                disabled={this.props.disabled}
                                label={'Shelf Life'}
                                date={this.props.formData.startDate}
                                inputType={'text'}
                                onChange={(value) => {this.props.onFieldChange('duration', value.inputValue==='' ? null : {value: value.inputValue, measurement: value.selectValue})}}
                                value={this.props.formData.duration?{inputValue: this.props.formData.duration.value, selectValue: this.props.formData.duration.measurement} : {inputValue: null, selectValue: 'na'}} 
                                options={[
                                    { label: 'N/A', value: 'na', enabled: false, inputValue: 'N/A' },
                                    { label: 'Days', value: 'days', enabled: true },
                                    { label: 'Weeks', value: 'weeks', enabled: true },
                                    { label: 'Months', value: 'months', enabled: true },
                                    { label: 'Years', value: 'years', enabled: true },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </FormsSection>
        );
    }
}

export default BatchData;
