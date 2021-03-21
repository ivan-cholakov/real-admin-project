import React, { Component } from 'react';
import { Checkbox } from 'antd';
import shortid from 'shortid';
import styles from './style.module.css';
import TextInput from '../../../../../pageWidgets/TextInput';
import { countries } from '../../../../../../assets/other/countries';
import SocialIcons from '../../../../../pageWidgets/SocialIcons';
import StyledEditor from '../../../../../pageWidgets/StyledEditor';
import BlueButton from '../../../../../pageWidgets/Buttons/Blue';
import RedButton from '../../../../../pageWidgets/Buttons/Red';
import StyledAutoComplete from '../../../../../pageWidgets/AutoComplete';
import CustomDropdown from '../../../../../pageWidgets/Dropdown';
import IconButton from '../../../../../pageWidgets/Buttons/Icon';
import { plus } from '../../../../../../assets/icons/sideNavigation/addAssets/icons';
import UploadVideo from '../../../../../pageWidgets/Upload/Video';
import UploadPhotos from '../../../../../pageWidgets/Upload/Photos';
import UploadCroppedPhoto from '../../../../../pageWidgets/Upload/CroppedPhoto';
import ModalComponent from './../../ModalComponent';
import ModalContent from './../../ModalContent';
import CertificationLabel from '../../../../../pageWidgets/CertificationLabel';
import ProductReward from './../../Reward';
import PhoneScreen from '../../../../../pageWidgets/PhoneScreen';
import SmallBlueOutline from '../../../../../pageWidgets/Buttons/SmallBlueOutline';
import DefaultLayout from '../../../../../pageWidgets/Upload/CroppedPhoto/DefaultLayout';
import { refactorBlobs } from '../../../../../pageWidgets/Upload/Photos/refactorBlobs';
// import { Config } from '../../../../../../core/config';

// const config = new Config();

const initialContent = {
    startDate: new Date().valueOf(),
    endDate: new Date().valueOf()
}

class About extends Component {
    constructor(props) {
        super(props);
        this.props.getBrands();
        this.props.getCertificates();
        this.handleScroll = this.handleScroll.bind(this);

        this.rightColumnRef = React.createRef();
    }

    static defaultProps = {
        product: {},
        edit: false
    }

    state = {
        imageFieldsDirty: {},
        phoneCollapsed: true,
        scrollingPhone: { top: 0, locked: false },
        priceCurrencySymbol: '£',
        formData: {
            photoGallery: [],
            video: {},
            certificates: [],
            retailPrice: {
                amount: 0,
                devider: 100,
                currency: 'GB'
            },
            rawPrice: 0.00,
            rewardPercentage: 2,
            featured: false,
        },
        selectedBrand: {},
        rewards: {
            fiat: 0,
            coins: 0,
            fiatCurrencySymbol: '£'
        },
        certificationModal: {
            visible: false,
            title: 'ADD A CERTIFICATION LABEL',
            content: {
            },
        },
        hyperLinkModal: {
            visible: false
        },
        deleteModal: {
            visible: false,
            title: 'Delete'
        }
    };

    async componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);
        const { edit } = this.props;
        let { product } = this.props;
        if (edit) {
            const { id } = this.props.match.params;
            product = await this.props.getProduct(id)
            this.setState({
                ...this.state,
                priceCurrencySymbol: (product.retailPrice && product.retailPrice.currencySymbol) || '£',
                formData: {
                    ...this.state.formData,
                    productId: product.id,
                    brandId: product.brandId,
                    displayName: product.displayName,
                    country: product.country,
                    description: product.description,
                    productType: product.type,
                    skuNumber: product.skuCode,
                    mainImage: product.mainImage,
                    video: product.video,
                    photoGallery: refactorBlobs(product.gallery),
                    about: product.about,
                    contents: product.contents,
                    notes: product.notes,
                    facebook: product.externalLinks.facebook,
                    linkedin: product.externalLinks.linkedin,
                    medium: product.externalLinks.medium,
                    snapchat: product.externalLinks.snapchat,
                    twitter: product.externalLinks.twitter,
                    youtube: product.externalLinks.youtube,
                    certificates: product.certificates,
                    retailPrice: {
                        amount: product.retailPrice.amount,
                        devider: product.retailPrice.divider,
                        currency: product.retailPrice.currency
                    },
                    rawPrice: product.retailPrice.amount / product.retailPrice.divider,
                    rewardPercentage: product.rewardPercentage,
                    featured: product.featured,
                }
            }, () => {
                this.onPriceChange(product.retailPrice.amount / product.retailPrice.divider);
                this.onPercentChange(product.rewardPercentage);
            });

        }
    }

    handleScroll = (e) => {
        if (!this.rightColumnRef.current) {
            return;
        }
        const rightColumnBox = this.rightColumnRef.current.getBoundingClientRect();
        if (this.state.phoneCollapsed) {
            if (e.target.scrollTop < 420) {
                this.setState({ scrollingPhone: { top: 0, locked: false } });
            } else if (e.target.scrollTop >= 420 && e.target.scrollTop <= 1000) {
                this.setState({ scrollingPhone: { top: -350, locked: true } });
            }
            else {
                this.setState({ scrollingPhone: { top: rightColumnBox.height - 761 - 90, locked: false } });
            }
        } else {
            this.setState({ scrollingPhone: { top: 0, locked: false } });
        }

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, false);
    }

    onFieldChange = (value, name) => {
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                [name]: value
            }
        });
    };

    openCertificationModal = () => {
        this.setState({
            ...this.state,
            certificationModal: {
                ...this.state.certificationModal,
                visible: true,
                content: initialContent,
            }
        })
    }
    onModalSubmit = (value) => {
        const { index } = this.state.certificationModal.content;
        let certificates;
        if (index !== undefined) {
            certificates = this.state.formData.certificates;
            delete value.index;
            certificates[index] = value;
        } else {
            certificates = [...this.state.formData.certificates, value]
        }
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                certificates,
            },
            certificationModal: {
                ...this.state.certificationModal,
                visible: false,
            }
        })
    };

    onModalCancel = () => {
        this.setState({
            ...this.state,
            certificationModal: {
                ...this.state.certificationModal,
                visible: false,
            }
        })
    }

    handleVisibleChange = (type) => (visible) => {
        this.setState({
            ...this.state,
            [type]: {
                ...this.state[type],
                visible,
            }
        })
    };

    formatData = (data) => {
        if (!data) {
            data = []
        }

        return data.map((item) => {
            return {
                label: { text: item.displayName },
                value: item.id,
            }
        });
    };

    formatCountries = (data) => {
        if (!data) {
            data = []
        }

        return data.map((item) => {
            return {
                label: { text: item.displayName },
                value: item.id,
            }
        });
    };


    certificationClick = (index) => {
        const cert = this.state.formData.certificates[index];
        
        this.setState({
            ...this.state,
            certificationModal: {
                ...this.state.certificationModal,
                visible: true,
                content: {
                    index,
                    ...cert
                }
            },
        })
    };

    certificationDelete = async (index) => {
        const certificationArray = [...this.state.formData.certificates];
        if (index > -1) {
            certificationArray.splice(index, 1);
        }
        this.handleDeleteModalChange();

        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                certificates: certificationArray
            },
        })
    };

    handleDeleteModalChange = (visible) => {
        this.setState({
            ...this.state,
            deleteModal: {
                ...this.state.deleteModal,
                visible
            }
        });

    };

    onBrandChange = (brandId) => {
        const [selectedBrand] = this.props.brands.filter(brand => brand.id === brandId)
        if (selectedBrand) {
            this.setState({
                ...this.state,
                formData: {
                    ...this.state.formData,
                    ...selectedBrand.externalLinks,
                    brandId: selectedBrand.id
                },
                selectedBrand,
            })
        }
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state.formData)
    }

    deleteProduct = () => {
        const {id} = this.props.match.params;
        this.props.deleteProduct(id);
    }
    onPriceChange = (rawPrice) => {
        if (Number.isNaN(rawPrice)) {
            return;
        }
        const percentage = this.state.formData.rewardPercentage;
        const { devider } = this.state.formData.retailPrice;
        const amount = Number.parseFloat(rawPrice) * devider;
        const fiatValue = ((amount * percentage) / 100) / devider;
        const coinValue = (fiatValue * 100)
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                retailPrice: {
                    ...this.state.formData.retailPrice,
                    amount: amount,
                },
                rawPrice: Number.parseFloat(rawPrice)
            },
            rewards: {
                fiat: fiatValue,
                coins: coinValue,
                fiatCurrencySymbol: this.state.priceCurrencySymbol
            }
        })
    }

    onPercentChange = (percent) => {
        if (Number.isNaN(percent)) {
            return;
        }
        const percentage = Number.parseInt(percent);
        const { devider } = this.state.formData.retailPrice;
        const { rawPrice } = this.state.formData;
        const amount = Number.parseFloat(rawPrice) * devider;
        const fiatValue = ((amount * percentage) / 100) / devider;
        const coinValue = (fiatValue * 100)
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                rewardPercentage: percentage
            },
            rewards: {
                fiat: fiatValue,
                coins: coinValue,
                fiatCurrencySymbol: this.state.priceCurrencySymbol || '£',
            }
        })
    }

    onPhoneCollapse = (collspsed) => {
        this.setState({
            phoneCollapsed: collspsed,
            scrollingPhone: { top: 0, locked: false }
        })
    }

    onGalleryChange = async (files) => {
        this.setState({
            ...this.state,
            imageFieldsDirty: {
                ...this.state.imageFieldsDirty,
                photoGallery: true
            },
            formData: {
                ...this.state.formData,
                photoGallery: files
            }
        });
    }

    onCheckBoxChange = () => {
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                featured: !this.state.formData.featured,
            }
        });
    }

    render() {
        
        return (
            <div className={styles.screenWrapper} onScroll={this.handleScroll}>
                <div className={styles.wrapper}>
                    <span className={styles.inputWrapper}>
                        <p>Use this page to describe your product</p>
                        <span>
                            <CustomDropdown
                                value={this.state.formData.brandId}
                                style={{ width: 360 }}
                                items={this.formatData(this.props.brands)}
                                onChange={(value) => this.onBrandChange(value)}
                                label="Select Brand"
                                grayColor={true}
                                allSelectable={true}
                                placeholder={'Select'}
                            />
                            <div className={styles.btnContainer}>
                                <IconButton small={true} icon={plus} title={'new'} />
                            </div>
                        </span>

                    </span>

                    <div className={styles.columnContainer} >
                        <div className={styles.column}>
                            <TextInput
                                value={this.state.formData.displayName}
                                onChange={(value) => this.onFieldChange(value, 'displayName')}
                                label="Product Name"
                                grayColor={true}
                                placeholder={'Enter'}
                            />
                            <p style={{ marginTop: '20px' }}>
                                <Checkbox
                                    checked={this.state.formData.featured}
                                    onChange={this.onCheckBoxChange}
                                >
                                Featured
                                </Checkbox>
                            </p>
                            <div style={{
                                marginTop: this.state.scrollingPhone.top + 'px',
                                position: this.state.scrollingPhone.locked ? 'fixed' : 'relative'
                            }}>
                                <PhoneScreen onCollapse={this.onPhoneCollapse} />
                            </div>
                        </div>
                        <div ref={this.rightColumnRef} className={styles.column}>
                            <StyledAutoComplete
                                dataSource={countries}
                                grayColor={true}
                                backgroundStyle={'grey'}
                                value={this.state.formData.country}
                                onChange={(value) => this.onFieldChange(value, 'country')}
                                placeholder={'Select'}
                                label="Country"
                            />
                            <TextInput
                                style={{ height: 90 }}
                                grayColor={true}
                                type={'textarea'}
                                value={this.state.formData.description}
                                onChange={(value) => { this.onFieldChange(value, 'description') }}
                                placeholder={'In One paragraph'}
                                label="Short Description"
                            />
                            <div className={styles.productImageCnt}>
                                <UploadCroppedPhoto onChange={(val) => { this.onFieldChange(val, 'mainImage') }} aspect={1 / 1}>
                                    <DefaultLayout title={'Upload packshot'} value={this.state.formData.mainImage} />
                                </UploadCroppedPhoto>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <CustomDropdown
                                    value={this.state.formData.productType}
                                    items={[
                                        {
                                            label: { text: 'Product Type 1' },
                                            value: 'productType1'
                                        },
                                        {
                                            label: { text: 'Product Type 2' },
                                            value: 'productType2'
                                        }
                                    ]}
                                    onChange={(value) => this.onFieldChange(value, 'productType')}
                                    label="Product type"
                                    grayColor={true}
                                    placeholder={'Select'}
                                />
                            </div>
                            <TextInput
                                grayColor={true}
                                value={this.state.formData.skuNumber}
                                onChange={(value) => { this.onFieldChange(value, 'skuNumber') }}
                                placeholder={'Enter'}
                                label="SKU Number"
                                tooltipTitle={'Optional'}
                            />
                            <span className={styles.styledButtonWrapper}>
                                <SmallBlueOutline
                                    icon={'plus'}
                                    style={{ background: '#fff', fontSize: 10, }}
                                    title={'ADD A CERTIFICATION LABEL'}
                                    onClick={this.openCertificationModal}
                                />
                            </span>
                            {this.state.formData.certificates.map((certification, i) => (
                                <CertificationLabel
                                    key={shortid.generate()}
                                    onClick={() => this.certificationClick(i)}
                                    label={certification.type}
                                    icon={certification.type}
                                    active={true}
                                    deleteModal={this.state.deleteModal}
                                    onDelete={() => this.certificationDelete(i)}
                                />
                            ))}
                            <div
                                style={{
                                    height: '266px', display: 'flex', marginTop: '25px',
                                    alignItems: 'center', justifyContent: 'center',
                                }}
                            >   

                                <UploadPhotos
                                    photos={this.state.formData.photoGallery}
                                    title="Add Product Photos"
                                    onChange={this.onGalleryChange} />
                            </div>
                            <div
                                style={{
                                    height: '266px', display: 'flex', marginTop: '25px',
                                    alignItems: 'center', justifyContent: 'center',
                                }}
                            >   
                                <UploadVideo
                                    video={this.state.formData.video}
                                    onChange={(value) => this.onFieldChange(value, 'video')} />
                            </div>

                            <StyledEditor
                                label="About"
                                value={this.state.formData.about}
                                onChange={(v) => this.onFieldChange(v, 'about')}
                            />
                            <StyledEditor
                                label="Contents"
                                value={this.state.formData.contents}
                                onChange={(v) => this.onFieldChange(v, 'contents')}
                            />
                            <StyledEditor
                                label="Notes"
                                value={this.state.formData.notes}
                                onChange={(v) => this.onFieldChange(v, 'notes')}
                            />
                            <p className={styles.socialTitle}>Edit Social links</p>
                            <SocialIcons
                                onFieldChange={this.onFieldChange}
                                formData={this.state.formData}
                            />

                        </div>
                    </div>
                </div>
                <ProductReward
                    price={this.state.formData.rawPrice}
                    percentage={this.state.formData.rewardPercentage}
                    onPriceChange={this.onPriceChange}
                    onPercentChange={this.onPercentChange}
                    rewards={this.state.rewards}
                />
                <div className={styles.saveButtonWrapper}>
                    <BlueButton
                        onClick={this.handleSubmit}
                        title={'NEXT'}
                    />
                    <RedButton onClick={this.deleteProduct} title={'DELETE'} />
                </div>
                <div className={styles.almondFondation}>
                    <span>The Almond Foundation needs to asses if your product<br />
                        meets the ecosystem’s standards - See Charter</span>
                </div>
                <ModalComponent
                    destroyOnClose={true}
                    visible={this.state.certificationModal.visible}
                    background={'grey'}
                    handleVisibleChange={() => { this.handleVisibleChange('certificationModal') }}
                    title={this.state.certificationModal.title}
                    footer={null}
                >
                    <ModalContent
                        certificates={this.props.certificates}
                        modalContent={this.state.certificationModal.content}
                        onModalSubmit={this.onModalSubmit}
                        onModalCancel={this.onModalCancel}
                        okTitle={'Save'}
                    />
                </ModalComponent>
            </div>
        );
    }
}

export default About
