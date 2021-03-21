import React, { Component } from 'react';
import { message, Checkbox } from 'antd';
import shortid from 'shortid';
import styles from './style.module.css';
import TextInput from '../../../pageWidgets/TextInput';
import StyledDropdown from '../../../pageWidgets/StyledDropdown';
import StyledEditor from '../../../pageWidgets/StyledEditor';
import SocialIcons from '../../../pageWidgets/SocialIcons';
import PhoneInput from '../../../pageWidgets/PhoneInput';
import { countries } from '../../../../assets/other/countries';
import UploadCroppedPhoto from '../../../pageWidgets/Upload/CroppedPhoto';
import FileUpload from '../../../pageWidgets/Upload/File';
import UploadVideo from '../../../pageWidgets/Upload/Video';
import UploadPhotos from '../../../pageWidgets/Upload/Photos';
import BrandInstagram from '../../../pageWidgets/BrandInstagram';
import BlueButton from '../../../pageWidgets/Buttons/Blue';
import RedButton from '../../../pageWidgets/Buttons/Red';
import { client } from '../../../../core/client';
import { getImageFromSessionStorage, blobToBase64 } from './containers/utils';
import { Config } from '../../../../core/config';
import b64toBlob from 'b64-to-blob';
import Thumbnail from '../../../pageWidgets/Upload/CroppedPhoto/Thumbnail';
import Cover from '../../../pageWidgets/Upload/CroppedPhoto/Cover';
import Button from '../../../pageWidgets/Upload/CroppedPhoto/Button';
import { refactorBlobs } from '../../../pageWidgets/Upload/Photos/refactorBlobs';
import CertificationLabel from '../../../pageWidgets/CertificationLabel';
import SmallBlueOutlineButton from '../../../pageWidgets/Buttons/SmallBlueOutline';
import ModalComponent from '../Product/ModalComponent';
import ModalContent from '../Product/ModalContent';

const initialData = {
    brandName: '',
    coverImage: null,
    mainImage: null,
    brandLogo: null,
    video: {},
    photoGallery: [],
    description: '',
    content: '',
    categoryId: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    snapchat: '',
    medium: '',
    webPage: '',
    featured: false,
    email: '',
    instagramFeed: [],
    phoneNumber: {},
    rewardPercentage: 0,
    returnDays: 0
};

const initialContent = {
    startDate: new Date().valueOf(),
    endDate: new Date().valueOf()
};

class NewBrand extends Component {
    constructor(props) {
        super(props);

        const config = new Config();
        this.protocol = config.getProtocol();
        this.host = config.getHost();
        this.port = config.getPort();
        this.apiUri = config.getApiUri();
        this.apiVersion = config.getApiVersion();
        const { clientId, redirectAddress } = config.getInstagramCredentials();
        this.clientId = clientId;
        this.redirectAddress = redirectAddress;
        this.state = {
            imageFieldsDirty: {},
            formData: {
                brandName: window.sessionStorage.getItem('brandName') || '',
                coverImage: getImageFromSessionStorage('coverImage') || '',
                mainImage: getImageFromSessionStorage('mainImage') || '',
                brandLogo: getImageFromSessionStorage('brandLogo') || '',
                video: window.sessionStorage.getItem('video')
                    ? JSON.parse(window.sessionStorage.getItem('video'))
                    : {},
                photoGallery: window.sessionStorage.getItem('photoGallery')
                    ? JSON.parse(window.sessionStorage.getItem('photoGallery')).map(p => {
                        const data = p.originFileObj.split(',')[1];
                        const meta = p.originFileObj.split(';')[0];
                        const contentType = meta.split(':')[1];
                        p.originFileObj = b64toBlob(data, contentType);
                        return p;
                    })
                    : [],
                description: window.sessionStorage.getItem('description') || '',
                categoryId: window.sessionStorage.getItem('categoryId') || '',
                facebook: window.sessionStorage.getItem('facebook') || '',
                twitter: window.sessionStorage.getItem('twitter') || '',
                linkedin: window.sessionStorage.getItem('linkedin') || '',
                youtube: window.sessionStorage.getItem('youtube') || '',
                snapchat: window.sessionStorage.getItem('snapchat') || '',
                medium: window.sessionStorage.getItem('medium') || '',
                webPage: window.sessionStorage.getItem('webPage') || '',
                email: window.sessionStorage.getItem('email') || '',
                content: window.sessionStorage.getItem('content')
                    ? JSON.parse(window.sessionStorage.getItem('content'))
                    : '',
                instagramFeed: window.sessionStorage.getItem('instagramFeed')
                    ? JSON.parse(window.sessionStorage.getItem('instagramFeed'))
                    : [],
                phoneNumber: window.sessionStorage.getItem('phoneNumber')
                    ? JSON.parse(window.sessionStorage.getItem('phoneNumber'))
                    : {
                        number: '',
                        prefix: '+44'
                    },
                feed: window.sessionStorage.getItem('feed'),
                rewardPercentage: 0
                // certificates: window.sessionStorage.getItem('certificates')
            },
            certificationModal: {
                visible: false,
                title: 'ADD A CERTIFICATION LABEL',
                content: {}
            },
            deleteModal: {
                visible: false,
                title: 'Delete'
            },
            visibleModal: 'none',
            certificates: []
        };
        this.handleModalVisibilityChange = this.handleModalVisibilityChange.bind(
            this
        );
        this.hideModal = this.hideModal.bind(this);
    }

    async componentDidMount() {
        const { edit } = this.props;
        const { id } = this.props.match.params;
        this.props.fetchCategories();
        this.props.getCertificatesTypes();

        if (edit) {
            if (id != null) {
                this.props.getCertificates(id);
            }
            const brand = await this.props.getBrand(id);

            this.setState({
                ...this.state,
                certificates: this.props.certificates,
                formData: {
                    ...this.state.formData,
                    brandId: brand.id,
                    brandName: brand.displayName,
                    coverImage: brand.cover,
                    mainImage: brand.image,
                    brandLogo: brand.logo,
                    video: brand.video,
                    photoGallery: refactorBlobs(brand.gallery),
                    description: brand.description,
                    content: brand.content,
                    categoryId: brand.categoryId,
                    facebook: brand.externalLinks.facebook,
                    twitter: brand.externalLinks.twitter,
                    medium: brand.externalLinks.medium,
                    snapchat: brand.externalLinks.snapchat,
                    linkedin: brand.externalLinks.linkedin,
                    youtube: brand.externalLinks.youtube,
                    webPage: brand.contact.webpage,
                    email: brand.contact.email,
                    phoneNumber: brand.contact.phone,
                    featured: brand.featured,
                    feed: brand.feed,
                    rewardPercentage: brand.rewardPercentage,
                    returnDays: brand.returnDays
                }
            });
        }
    }

  handleModalVisibilityChange = name => {
      this.setState({ visibleModal: name });
  };

  hideModal() {
      this.setState({ visibleModal: 'none' });
  }

  addHttp = url => {
      if (url.indexOf('http') === -1) {
          url = 'http://' + url;
      }
      return url;
  };

  onFieldChange = (value, name) => {
      if (name === 'webPage') {
          value = this.addHttp(value);
      }
      this.setState({
          ...this.state,
          formData: {
              ...this.state.formData,
              [name]: value
          }
      });
  };

  onImageChange = (name, value) => {
      if (name === 'brandLogo') {
          const mime = value.name.split('.').pop();
          if (mime !== 'jpg' && mime !== 'png' && mime !== 'jpeg') {
              message.error('Invalid Image Format', 3);
              return false;
          }
      }
      this.setState({
          ...this.state,
          imageFieldsDirty: {
              ...this.state.imageFieldsDirty,
              [name]: true
          },
          formData: {
              ...this.state.formData,
              [name]: value
          }
      });
  };

  saveToLocalStorage = async () => {
      const {
          photoGallery,
          coverImage,
          mainImage,
          brandLogo,
          brandName,
          video,
          description,
          content,
          categoryId,
          facebook,
          linkedin,
          twitter,
          youtube,
          snapchat,
          medium,
          webPage,
          email,
          phoneNumber
      //   returnDays
      } = this.state.formData;

      const promises = photoGallery.map(async f => {
          const copy = { ...f };
          copy.originFileObj = await blobToBase64(copy.originFileObj);
          return copy;
      });
      const data = await Promise.all(promises);
      const base64CoverImage = coverImage && (await blobToBase64(coverImage));
      const base64MainImage = mainImage && (await blobToBase64(mainImage));
      const base64BrandLogo = brandLogo && (await blobToBase64(brandLogo));

      window.sessionStorage.setItem('photoGallery', JSON.stringify(data));
      coverImage && window.sessionStorage.setItem('coverImage', base64CoverImage);
      mainImage && window.sessionStorage.setItem('mainImage', base64MainImage);
      brandLogo && window.sessionStorage.setItem('brandLogo', base64BrandLogo);
      window.sessionStorage.setItem('brandName', brandName || '');
      video && window.sessionStorage.setItem('video', JSON.stringify(video));
      window.sessionStorage.setItem('description', description || '');
      window.sessionStorage.setItem(
          'content',
          content ? JSON.stringify(content) : ''
      );
      window.sessionStorage.setItem('categoryId', categoryId);
      window.sessionStorage.setItem('facebook', facebook || '');
      window.sessionStorage.setItem('linkedin', linkedin || '');
      window.sessionStorage.setItem('twitter', twitter || '');
      window.sessionStorage.setItem('youtube', youtube || '');
      window.sessionStorage.setItem('snapchat', snapchat || '');
      window.sessionStorage.setItem('medium', medium || '');
      window.sessionStorage.setItem('webPage', webPage || '');
      window.sessionStorage.setItem('email', email || '');
      window.sessionStorage.setItem('phoneNumber', JSON.stringify(phoneNumber));
  };

  onInstagramFeed = imageData => {
      window.sessionStorage.clear();
      this.setState({
          ...this.state,
          formData: {
              ...this.state.formData,
              instagramFeed: imageData
          }
      });
  };

  onGalleryChange = async files => {
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
  };

  clearImageFields = imageFields => {
      let result = {};
      imageFields.forEach(imageField => {
          if (!this.state.imageFieldsDirty[imageField.name]) {
              result[imageField] = imageField.value;
          }
      });
      return result;
  };

  handleSubmit = async () => {
      const imageFieldsDirty = this.clearImageFields([
          { name: 'mainImage', value: null },
          { name: 'coverImage', value: null },
          { name: 'brandLogo', value: null },
          { name: 'photoGallery', value: [] }
      ]);
      const formDataForSave = Object.assign(
          {},
          this.state.formData,
          imageFieldsDirty
      );

      const result = await this.props.onSubmit(
          formDataForSave,
          this.state.certificates
      );
      if (result) {
          this.setState({
              ...this.state,
              formData: initialData
          });
      }
  };

  deleteBrand = () => {
      const { id } = this.props.match.params;
      this.props.deleteBrand(id);
  };

  onCheckBoxChange = () => {
      this.setState({
          ...this.state,
          formData: {
              ...this.state.formData,
              featured: !this.state.formData.featured
          }
      });
  };

  openCertificationModal = () => {
      this.setState({
          ...this.state,
          certificationModal: {
              ...this.state.certificationModal,
              visible: true,
              content: initialContent
          }
      });
  };

  certificationClick = index => {
      const cert = this.state.certificates[index];

      this.setState({
          ...this.state,
          certificationModal: {
              ...this.state.certificationModal,
              visible: true,
              content: {
                  index,
                  ...cert
              }
          }
      });
  };

  onModalSubmit = value => {
      const { index } = this.state.certificationModal.content;
      let certificates;
      if (index !== undefined) {
          certificates = this.state.certificates;
          delete value.index;
          certificates[index] = {
              ...value,
              ownerId: this.props.match.params.id
          };
      } else {
          certificates = this.state.certificates
              ? [
                  ...this.state.certificates,
                  {
                      ...value,
                      ownerId: this.props.match.params.id
                  }
              ]
              : [
                  {
                      ...value,
                      ownerId: this.props.match.params.id
                  }
              ];
      }
      this.setState({
          ...this.state,
          certificates,
          certificationModal: {
              ...this.state.certificationModal,
              visible: false
          }
      });
  };

  onModalCancel = () => {
      this.setState({
          ...this.state,
          certificationModal: {
              ...this.state.certificationModal,
              visible: false
          }
      });
  };

  handleVisibleChange = type => visible => {
      this.setState({
          ...this.state,
          [type]: {
              ...this.state[type],
              visible
          }
      });
  };
  handleDeleteModalChange = visible => {
      this.setState({
          ...this.state,
          deleteModal: {
              ...this.state.deleteModal,
              visible
          }
      });
  };

  certificationDelete = async index => {
      const certificationArray = [...this.state.certificates];
      if (index > -1) {
          certificationArray.splice(index, 1);
      }

      this.handleDeleteModalChange();
      this.setState({
          ...this.state,
          certificates: certificationArray
      });
  };

  dropdownRewardLevelOptions = () =>{
      const items = [
          {
              label: 'Platinum - 12.5%',
              value: 12.5,
          },
          {
              label: 'Gold - 10%',
              value: 10,
          },
          {
              label: 'Silver - 5%',
              value: 5,
          },
          {
              label: 'Bronze - 2.5%',
              value: 2.5,
          },
          {
              label: 'Green - 1.25%',
              value: 1.25,
          },
      ]
      return items;
  }

  render() {
      let categories = [];
      if (this.props.categories.length) {
          categories = this.props.categories;
      }
      const categoryOptions = categories.filter(c => c.parentId === '-1').map(c=>{
          return {label: c.name, value: c.id}
      });

      return (
          <div className={styles.wrapper}>
              {this.props.edit && (
                  <img
                      className={styles.qrImage}
                      src={`${this.protocol}://${this.host}:${this.port}${this.apiUri}${
                          this.apiVersion
                      }/brands/${
                          this.props.match.params.id
                      }/qr?token=${client.auth.getSessionToken()}`}
                  />
              )}
              <span className={styles.inputWrapper}>
                  <span>
                      <TextInput
                          // border={'solid 1px rgba(172,172,172,0.2)'}
                          grayColor={true}
                          labelPosition={'centered'}
                          onChange={value => this.onFieldChange(value, 'brandName')}
                          label="Brand Name"
                          value={this.state.formData.brandName}
                          placeholder={'Enter'}
                      />
                  </span>
                  <div
                      style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-around'
                      }}
                  >
                      <div style={{ width: '25%' }}>
                          <TextInput
                              grayColor={true}
                              value={this.state.formData.returnDays}
                              type="number"
                              onChange={value => {
                                  this.onFieldChange(value, 'returnDays');
                              }}
                              placeholder={'Return days'}
                              min={0}
                              label="Set return days"
                          />
                      </div>
                      <div style={{ width: '35%' }}>
                          <StyledDropdown
                              backgroundStyle={'grey'}
                              value={this.state.formData.rewardPercentage}
                              onChange={value=>this.onFieldChange(value, 'rewardPercentage')}
                              label="Reward Level"
                              placeholder="Select"
                              options={this.dropdownRewardLevelOptions()}
                          />
                      </div>
                  </div>
                  <p style={{ marginTop: '20px' }}>
            Create a brand Profile Page. Individual pages will be created for
            each product/SKU so please remain general
                  </p>
                  <p style={{ marginTop: '20px' }}>
                      <Checkbox
                          checked={this.state.formData.featured}
                          onChange={this.onCheckBoxChange}
                      >
              Featured
                      </Checkbox>
                  </p>
              </span>

              <div className={styles.columnContainer}>
                  <div className={styles.column}>
                      <div className={styles.coverImage}>
                          <div className={styles.thumbnailContainer}>
                              <UploadCroppedPhoto
                                  onChange={val => {
                                      this.onImageChange('mainImage', val);
                                  }}
                                  aspect={1 / 1}
                              >
                                  <Thumbnail
                                      value={this.state.formData.mainImage}
                                      title={'Add Circular Logo'}
                                  />
                              </UploadCroppedPhoto>
                          </div>
                          <div className={styles.coverContainer}>
                              <UploadCroppedPhoto
                                  onChange={val => {
                                      this.onImageChange('coverImage', val);
                                  }}
                                  aspect={16 / 9}
                              >
                                  <Cover value={this.state.formData.coverImage} />
                              </UploadCroppedPhoto>
                          </div>
                      </div>
                      <div className={styles.greyBackground}>
                          <div className={styles.widgetContainer}>
                              <FileUpload
                                  onChange={val => {
                                      this.onImageChange('brandLogo', val);
                                  }}
                                  aspect={7 / 1.5}
                              >
                                  <Button
                                      value={this.state.formData.brandLogo}
                                      label={'Add Brand Logo'}
                                  />
                              </FileUpload>
                          </div>
                          <div className={styles.widgetContainer}>
                              <UploadVideo
                                  video={this.state.formData.video}
                                  onChange={value => this.onFieldChange(value, 'video')}
                              />
                          </div>
                          <div className={styles.widgetContainer}>
                              <UploadPhotos
                                  photos={this.state.formData.photoGallery}
                                  title="Add Brand Photos"
                                  onChange={this.onGalleryChange}
                              />
                          </div>
                          <div className={styles.widgetContainer}>
                              <BrandInstagram
                                  feed={this.state.formData.instagramFeed}
                                  instagramToken={this.state.formData.feed}
                                  onClick={this.saveToLocalStorage}
                                  onImageData={this.onInstagramFeed}
                                  onAuthorized={token => this.onFieldChange(token, 'feed')}
                              />
                          </div>
                      </div>
                  </div>
                  <div className={styles.column}>
                      <TextInput
                          style={{ height: 150 }}
                          grayColor={true}
                          type={'textarea'}
                          value={this.state.formData.description}
                          onChange={value => {
                              this.onFieldChange(value, 'description');
                          }}
                          placeholder={'In One Paragraph'}
                          label="Description"
                      />
                      <span className={styles.styledButtonWrapper}>
                          <SmallBlueOutlineButton
                              icon={'plus'}
                              style={{ background: '#fff', fontSize: 10 }}
                              title={'ADD A CERTIFICATION LABEL'}
                              onClick={this.openCertificationModal}
                          />
                      </span>
                      {this.state.certificates &&
              Boolean(this.state.certificates.length) &&
              this.state.certificates.map((certification, i) => (
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
                      <StyledDropdown
                          value={this.state.formData.categoryId}
                          backgroundStyle={'grey'}
                          onChange={value => {
                              this.onFieldChange(value, 'categoryId');
                          }}
                          options={categoryOptions}
                          placeholder={'Select'}
                          label="Sector"
                      />
                      <StyledEditor
                          label="About"
                          value={this.state.formData.content}
                          onChange={v => this.onFieldChange(v, 'content')}
                      />
                      <SocialIcons
                          onFieldChange={this.onFieldChange}
                          formData={this.state.formData}
                      />
                      <TextInput
                          grayColor={true}
                          value={this.state.formData.webPage}
                          onChange={value => {
                              this.onFieldChange(value, 'webPage');
                          }}
                          placeholder={'Paste a URL'}
                          label="Web Page"
                      />
                      <TextInput
                          grayColor={true}
                          value={this.state.formData.email}
                          onChange={value => {
                              this.onFieldChange(value, 'email');
                          }}
                          placeholder={'e.g. contact@brand.com'}
                          label="Contact Email"
                      />
                      <PhoneInput
                          value={{
                              prefix: this.state.formData.phoneNumber.prefix || '+44',
                              number: this.state.formData.phoneNumber.number || ''
                          }}
                          onChange={value => {
                              this.onFieldChange(value, 'phoneNumber');
                          }}
                          tooltipTitle={'Why?'}
                          tooltipContent={'lorem ipsum'}
                          backgroundStyle={'grey'}
                          options={countries}
                          label="Contact Number"
                      />
                  </div>
              </div>
              <div className={styles.saveButtonWrapper}>
                  <BlueButton onClick={this.handleSubmit} title={'SAVE'} />
                  <RedButton onClick={this.deleteBrand} title={'DELETE'} />
              </div>
              <ModalComponent
                  destroyOnClose={true}
                  visible={this.state.certificationModal.visible}
                  background={'grey'}
                  handleVisibleChange={() => {
                      this.handleVisibleChange('certificationModal');
                  }}
                  title={this.state.certificationModal.title}
                  footer={null}
              >
                  <ModalContent
                      certificates={this.props.certificateTypes}
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

export default NewBrand;
