import React, { Component } from 'react';

import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, Typography, Tree } from 'antd';

import CustomLabel from './CustomLabel';
import ModalComponent from '../../components/common/modal';
import ModalFooter from '../../components/common/modal/Footer';
import TextInput from '../../components/pageWidgets/TextInput';
import UploadCroppedPhoto from '../../components/pageWidgets/Upload/CroppedPhoto';
import DefaultLayout from '../../components/pageWidgets/Upload/CroppedPhoto/DefaultLayout';
import {
    fetchCategories,
    updateCategory,
    deleteCategory,
    createCategory,
    uploadImage
} from './actions';
import { Config } from '../../core/config';
import { client } from '../../core/client';

import 'rc-tree/assets/index.css';
import './styles.css';

const { Title } = Typography;
const { TreeNode } = Tree;
const config = new Config();

class Categories extends Component {
  state = {
      categoriesData: [],
      autoExpandParent: true,
      addCategoryModalVisible: false,
      newCategoryName: '',
      newCategoryDescription: '',
      iconBlob: '',
      icon: '',
      coverBlob: '',
      cover: '',
      editingId: null
  };

  componentDidMount() {
      this.props.fetchCategories();
  }

  componentDidUpdate(prevProps, prevState) {
      if (
          (!prevProps.categories.length && this.props.categories.length) ||
      !_.isEqual(prevProps.categories, this.props.categories)
      ) {
          const prepState = {};
          this.props.categories.forEach(
              ({ name, icon, id, description, cover }) =>
                  (prepState[id] = {
                      isEditing: false,
                      name,
                      icon,
                      cover,
                      description
                  })
          );
          prepState.categoriesData = this.createTreeStructure('-1');

          this.setState({ ...this.state, ...prepState });
      }
  }

  compareState = (prevState, state) => {
      return !_.isEqual(prevState, state);
  };

  createTreeStructure = startingId => {
      const treeStructure = [];
      const clonedCategories = _.cloneDeep(this.props.categories);
      clonedCategories
          .sort((a, b) => (a.position < b.position ? -1 : 1))
          .forEach(c => {
              if (c.parentId === startingId) {
                  const children = this.createTreeStructure(c.id);

                  if (children.length) {
                      c.children = children;
                  }
                  treeStructure.push(c);
              }
          });
      return treeStructure;
  };

  sanitizeParentObject = category => {
      let result = { ...category };

      const children = result.children.map((c, index) => {
          c.position = index;
          return c;
      });
      delete result.children;

      return { result, children };
  };

  normalizeStateCategories = categories => {
      let normalizedCategories = [];

      _.cloneDeep(categories).forEach(category => {
          if (category.children) {
              const sanitizedCategory = this.sanitizeParentObject(category);
              normalizedCategories.push(
                  ...[
                      ...this.normalizeStateCategories(sanitizedCategory.children),
                      sanitizedCategory.result
                  ]
              );
          } else {
              normalizedCategories.push(category);
          }
      });

      return normalizedCategories;
  };

  changeParentId = (data, levelId) => {
      const clonedData = _.cloneDeep(data);
      return clonedData.map(entry => {
          if (entry.parentId !== levelId) {
              entry.parentId = levelId;
          }
          if (entry.children) {
              entry.children = this.changeParentId(entry.children, entry.id);
          }
          return entry;
      });
  };

  onExpand = (...args) => {};

  onDragStart = info => {};

  onDragEnter = info => {};

  onDrop = info => {
      const dropKey = info.node.props.eventKey;
      const dragKey = info.dragNode.props.eventKey;
      const dropPos = info.node.props.pos.split('-');
      const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

      const loop = (data, key, callback) => {
          data.forEach((item, index, arr) => {
              if (item.id === key) {
                  return callback(item, index, arr);
              }
              if (item.children) {
                  return loop(item.children, key, callback);
              }
          });
      };
      const data = _.cloneDeep(this.state.categoriesData);

      let dragObj;
      loop(data, dragKey, (item, index, arr) => {
          arr.splice(index, 1);
          dragObj = item;
      });

      if (!info.dropToGap) {
          loop(data, dropKey, item => {
              item.children = item.children || [];

              item.children.push(dragObj);
          });
      } else if (
          (info.node.props.children || []).length > 0 &&
      info.node.props.expanded &&
      dropPosition === 1
      ) {
          loop(data, dropKey, item => {
              item.children = item.children || [];

              item.children.unshift(dragObj);
          });
      } else {
          let ar;
          let i;
          loop(data, dropKey, (item, index, arr) => {
              ar = arr;
              i = index;
          });
          if (dropPosition === -1) {
              ar.splice(i, 0, dragObj);
          } else {
              ar.splice(i + 1, 0, dragObj);
          }
      }

      this.setState(
          {
              categoriesData: this.changeParentId(data, '-1')
          },
          () => {
              const normalizedData = this.normalizeStateCategories(
                  this.state.categoriesData
              );

              const sorterObj = {};
              normalizedData.forEach(category => {
                  if (!sorterObj[category.parentId]) {
                      sorterObj[category.parentId] = [];
                  }
                  sorterObj[category.parentId].push(category);
              });
              Object.keys(sorterObj).forEach(key => {
                  sorterObj[key].forEach((category, index) => {
                      if (category.position !== index + 1) {
                          category.position = index + 1;
                          this.props.updateCategory(category);
                      }
                  });
              });
          }
      );
  };

  onEdit = id => () => {
      this.setState(
          {
              [id]: { ...this.state[id], isEditing: true },
              editingId: id,
              iconBlob: null,
              coverBlob: null,
          }
      );
  };

  onDel = id => () => {
      this.props.deleteCategory(id).then(() => this.props.fetchCategories());
  };

  onCustomLabelInputChange = (id, field) => value => {
      this.setState({
          [id]: { ...this.state[id], [field]: value }
      });
  };

  onCustomLabelButtonClick = id => () => {
      this.setState(
          {
              [id]: {
                  ...this.state[id],
                  isEditing: false
              },
              editingId: null,
              coverBlob: null,
              iconBlob: null,
          },
          () => {
              this.props
                  .updateCategory({
                      ...this.props.categories.find(cat => cat.id == id),
                      name: this.state[id].name,
                      icon: this.state[id].icon,
                      cover: this.state[id].cover,
                      description: this.state[id].description
                  })
                  .then(() => 
                      this.props.fetchCategories());
          }
      );
  };

  onCustomLabelPhotoUpdate = id => async iconBlob => {
      this.setState({ iconBlob });

      const res = await this.props.uploadImage(iconBlob);
      const icon = res.action.payload.identifier;
      this.setState({ [id]: { ...this.state[id], icon } });
  };
  
  onCustomCoverPhotoUpdate = id => async coverBlob => {
      this.setState({ coverBlob });

      const res = await this.props.uploadImage(coverBlob);
      const cover = res.action.payload.identifier;
      this.setState({ [id]: { ...this.state[id], cover } });
  };

  renderTree = data =>
      data.map(item => {
          const customLabelProps = {
              ...item,
              state: this.state,
              onEdit: this.onEdit,
              onDel: this.onDel,
              onInputChange: this.onCustomLabelInputChange,
              onButtonClick: this.onCustomLabelButtonClick,
              handlePhotoUpdate: this.onCustomLabelPhotoUpdate,
              handleModalCancel: this.handleModalCancel
          };

          if (item) {
              return item.children && item.children.length ? (
                  <TreeNode
                      key={item.id}
                      title={<CustomLabel {...customLabelProps} />}
                      className="tree-node"
                  >
                      {this.renderTree(item.children)}
                  </TreeNode>
              ) : (
                  <TreeNode
                      key={item.id}
                      title={<CustomLabel {...customLabelProps} />}
                      className="tree-node"
                  />
              );
          }
      });

  handleModalChange = field => value => {
      this.setState({ [field]: value });
  };

  triggerAddCategoryModal = () => {
      this.setState({ addCategoryModalVisible: true });
  };

  handleModalCancel = (create, id) => () => {
      if (create) {
          this.setState({
              addCategoryModalVisible: false,
              newCategoryName: '',
              icon: '',
              cover: '',
              iconBlob: null,
              coverBlob: null,
              editingId: null
          });
      } else if (id) {
          this.setState({
              [id]: { ...this.state[id], isEditing: false },
              editingId: null
          });
      }
  };

  handleModalSubmit = () => {
      const newCategory = {
          name: this.state.newCategoryName,
          icon: this.state.icon,
          cover: this.state.cover,
          description: this.state.newCategoryDescription,
      };
      this.props.createCategory(newCategory).then(() => {
          this.props.fetchCategories().then(res => {
              this.handleModalCancel(true)();
          });
      });
  };

  handlePhotoUpdate = async iconBlob => {
      this.setState({ iconBlob });

      const res = await this.props.uploadImage(iconBlob);
      const icon = res.action.payload.identifier;
      this.setState({ icon });
  };

  handleCoverUpdate = async coverBlob => {
      this.setState({ coverBlob });

      const res = await this.props.uploadImage(coverBlob);
      const cover = res.action.payload.identifier;
      this.setState({ cover });
  };

  entityModal = isEditing => {
      let iconToDisplay = '';
      let coverToDisplay = '';
      const baseUrl = `${config.getBaseUrl()}/storage`;
      const token = client.auth.getSessionToken();
      if (this.state.iconBlob || (this.state[this.state.editingId] && this.state[this.state.editingId].icon)) {
          iconToDisplay = this.state.iconBlob || `${baseUrl}${this.state[this.state.editingId].icon}?token=${token}`;
      }

      if (this.state.coverBlob || (this.state[this.state.editingId] && this.state[this.state.editingId].cover)) {
          coverToDisplay = this.state.coverBlob || `${baseUrl}${this.state[this.state.editingId].cover}?token=${token}`;
      }

      return (
          <ModalComponent
              visible={
                  this.state.addCategoryModalVisible ||
          (this.state.editingId &&
            (this.state[this.state.editingId] &&
              this.state[this.state.editingId].isEditing))
              }
              title={`${isEditing ? 'Edit' : 'Create'} Category`}
          >
              <TextInput
                  value={
                      isEditing
                          ? this.state[this.state.editingId].name
                          : this.state.newCategoryName
                  }
                  label={'Category name'}
                  grayColor={true}
                  onChange={
                      isEditing
                          ? this.onCustomLabelInputChange(this.state.editingId, 'name')
                          : this.handleModalChange('newCategoryName')
                  }
              />
              <UploadCroppedPhoto
                  onChange={
                      isEditing
                          ? this.onCustomLabelPhotoUpdate(this.state.editingId)
                          : this.handlePhotoUpdate
                  }
                  aspect={1 / 1}
              >
                  <DefaultLayout value={iconToDisplay} title = {'Add category icon'} styleHeight='150px'/>
              </UploadCroppedPhoto>

              <UploadCroppedPhoto
                  onChange={
                      isEditing
                          ? this.onCustomCoverPhotoUpdate(this.state.editingId)
                          : this.handleCoverUpdate
                  }
                  aspect={16 / 9}
              >
                  <DefaultLayout value={coverToDisplay} title = {'Add category cover'}/>
              </UploadCroppedPhoto>
              <TextInput
                  value={
                      isEditing
                          ? this.state[this.state.editingId].description
                          : this.state.newCategoryDescription
                  }
                  label={'Description'}
                  type="textarea"
                  grayColor={true}
                  onChange={
                      isEditing
                          ? this.onCustomLabelInputChange(
                              this.state.editingId,
                              'description'
                          )
                          : this.handleModalChange('newCategoryDescription')
                  }
              />
              <ModalFooter
                  cancelTitle={'CANCEL'}
                  okTitle={isEditing ? 'SAVE' : 'CREATE'}
                  onCancel={this.handleModalCancel(true)}
                  onSubmit={
                      isEditing
                          ? this.onCustomLabelButtonClick(this.state.editingId)
                          : this.handleModalSubmit
                  }
              />
          </ModalComponent>
      );
  };

  render() {
      return (
          <div className="container">
              <Button className="new-btn" onClick={this.triggerAddCategoryModal}>
                  <Title level={3}>New +</Title>
              </Button>
              <Tree
                  className="categories"
                  draggable
                  defaultExpandAll
                  onExpand={this.onExpand}
                  onDragStart={this.onDragStart}
                  onDragEnter={this.onDragEnter}
                  onDrop={this.onDrop}
                  autoExpandParent={true}
              >
                  {this.renderTree(this.state.categoriesData)}
              </Tree>
              {this.entityModal(Boolean(this.state.editingId))}
          </div>
      );
  }
}

const mapStateToProps = state => {
    const startingRoute = state.Categories;

    return {
        categories: startingRoute.categories
    };
};

const mapDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories()),
    updateCategory: category => dispatch(updateCategory(category)),
    deleteCategory: id => dispatch(deleteCategory(id)),
    createCategory: category => dispatch(createCategory(category)),
    uploadImage: iconBlob => {
        const formData = new FormData();
        formData.set('image', iconBlob);
        const res = dispatch(uploadImage(formData)).then(resp => {
            if (!resp.action.payload.error) {
                return resp;
            }
        });
        return res;
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Categories);
