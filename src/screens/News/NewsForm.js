import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import StyledEditor from '../../components/pageWidgets/StyledEditor';
// import StyledDropdown from '../../components/pageWidgets/StyledDropdown';
import Dropdown from '../../components/pageWidgets/Dropdown';
import TextInput from '../../components/pageWidgets/TextInput';
import BlueButton from '../../components/pageWidgets/Buttons/Blue';
import RedButton from '../../components/pageWidgets/Buttons/Red';
import UploadCroppedPhoto from '../../components/pageWidgets/Upload/CroppedPhoto';
import Cover from '../../components/pageWidgets/Upload/CroppedPhoto/Cover';
import { Config } from '../../core/config';
import { client } from '../../core/client';

import styles from './style.module.css';
import './style.newsForm.css';

const config = new Config();

class NewsForm extends Component {
  state = {
      formData: {
          heading: '',
          content: '',
          categoryId: '',
          image: '',
          type: ''
      },
      blob: null
  };
  componentDidMount() {
      if (this.props.editing) {
          this.props.getAPieceOfNews(this.props.match.params.id);
      }
      this.props.getCategories();
  }

  componentDidUpdate(prevProps) {
      if (!prevProps.aPieceOfNewsData && this.props.aPieceOfNewsData) {
          this.setState({
              formData: {
                  ...this.props.aPieceOfNewsData
              }
          });
      }
  }

  componentWillUnmount() {
      this.props.resetState();
  }
  handleInputChange = field => val => {
      this.setState({ formData: { ...this.state.formData, [field]: val } });
  };

  handleSubmit = () => {
      this.props.onFormSubmit(this.state.formData, this.state.blob);

      this.props.history.push('/system/news');
  };

  deleteNews = id => () => {
      this.props.deleteAPieceOfNews(id);
      this.props.history.push('/system/news');
  };

  onImageChange = async val => {
      this.setState({ blob: val });

      try {
          const res = await this.props.updateNewsPhoto(val);

          const image = res.action.payload.identifier;
          this.setState({
              formData: { ...this.state.formData, image }
          });
      } catch (e) {
          console.log(e);
      }
  };

  formatCategoriesData = () =>
      this.props.categories
          .map(
              category =>
                  category.parentId == -1 && {
                      label: category.name,
                      value: category.id,
                      children: this.props.categories
                          .filter(c => c.parentId === category.id)
                          .map(c => ({
                              label: c.name,
                              value: c.id
                          }))
                  }
          )
          .filter(c => Boolean(c));

  render() {
      const { id } = this.props.match.params;
      const baseUrl = `${config.getBaseUrl()}/storage`;
      const token = client.auth.getSessionToken();

      const articleTypes = this.props.types.map(t => ({
          label: t,
          value: t
      }));
      let coverImage = '';
      if (this.state.blob || this.state.formData.image) {
          coverImage =
        this.state.blob ||
        `${baseUrl}${
            this.state.formData.image
        }?token=${token}&width=300&height=200&quality=80`;
      }

      return (
          <div className={'container'}>
              <Dropdown
                  underlined
                  grayColor
                  value={this.state.formData.categoryId}
                  onChange={this.handleInputChange('categoryId')}
                  label="Categories"
                  placeholder="Select"
                  items={this.formatCategoriesData()}
                  style={{ backgroundColor: '#f8f7f7' }}
              />

              <Dropdown
                  underlined
                  grayColor
                  value={this.state.formData.type}
                  onChange={this.handleInputChange('type')}
                  label="Type"
                  placeholder="Select"
                  items={articleTypes}
                  style={{ backgroundColor: '#f8f7f7' }}
              />
              <div className={'heading'}>
                  <TextInput
                      grayColor
                      labelPosition={'centered'}
                      onChange={this.handleInputChange('heading')}
                      value={this.state.formData.heading}
                      placeholder={'Enter a heading'}
                  />
              </div>
              <div className="upload-photo">
                  <UploadCroppedPhoto onChange={this.onImageChange} aspect={16 / 9}>
                      <Cover grayColor value={coverImage} title={'Add Image'} />
                  </UploadCroppedPhoto>
              </div>
              <div className={'content'}>
                  <StyledEditor
                      label="Description"
                      value={this.state.formData.content}
                      onChange={this.handleInputChange('content')}
                  />
              </div>

              <BlueButton
                  className={styles.saveButton}
                  onClick={this.handleSubmit}
                  title={'SAVE'}
              />
              {this.props.editing && (
                  <RedButton
                      className={styles.deleteButton}
                      onClick={this.deleteNews(id)}
                      title={'DELETE'}
                  />
              )}
          </div>
      );
  }
}

export default withRouter(NewsForm);
