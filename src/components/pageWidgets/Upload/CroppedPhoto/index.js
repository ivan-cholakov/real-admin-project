import React, { Component } from 'react';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './customStyles.css';
import styles from './style.module.css';
import { connect } from 'react-redux';
import { Upload } from 'antd';
// import Notification from '../../../../components/common/Notification';
import StyledRadioButtons from '../../../../components/pageWidgets/StyledRadioButtons';
import { triggerNotification } from '../../../common/Notification/actions';
import ModalFooter from '../../../common/modal/Footer';
import ModalComponent from '../../../common/modal';

class UploadCroppedPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            aspect: null,
            crop: {},
            originalDimensions: {
                width: 0,
                height: 0
            }
        };
        this.avatarSize = 128;
        this.containerRef = React.createRef();
        this.handleDraggerChange = this.handleDraggerChange.bind(this);
        this.createImageFromUpload = this.createImageFromUpload.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleReadyBlob = this.handleReadyBlob.bind(this);
        this.hide = this.hide.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.imageURL = '';
        if (Array.isArray(props.aspect)) {
            this.aspectOptions = props.aspect.map(option => ({
                value: option.value,
                title: option.title
            }));
        }
    }
  initialCrop = () => {
      let aspect = this.props.aspect ? this.props.aspect : 1 / 1;
      if (Array.isArray(aspect)) {
          aspect = aspect[0].value;
      }
      const { width, height } = this.state.originalDimensions;
      const crop = makeAspectCrop(
          { aspect, width: 100, x: 0, y: 0 },
          width / height
      );
      this.onChange(crop);
  };

  onAspectChange = e => {
      let crop;
      const { width, height } = this.state.originalDimensions;
      if (e.target.value >= 1) {
          crop = makeAspectCrop(
              { aspect: e.target.value, width: 100, x: 0, y: 0 },
              width / height
          );
      } else {
          crop = makeAspectCrop(
              { aspect: e.target.value, height: 100, x: 0, y: 0 },
              width / height
          );
      }
      this.onChange(crop);
  };

  createImageFromUpload(file) {
      const mime = file.name.split('.').pop();
      if (mime !== 'jpg' && mime !== 'png' && mime !== 'jpeg') {
          this.props.triggerNotification({
              msg: 'Invalid image format',
              duration: 2,
              type: 'error'
          });
          return false;
      }
      this.imageURL = URL.createObjectURL(file);
      let img = new Image();
      img.src = this.imageURL;
      img.onload = () => {
          const originalDimensions = {
              width: img.width,
              height: img.height
          };
          this.setState({ originalDimensions }, this.initialCrop);
      };
      return true;
  }
  handleDraggerChange(info) {
      //hack becauses apparently multiple = {false} doesn't work for Dragger
      if (info.fileList.length > 1) {
          for (let i = 1; i < info.fileList.length; i++) {
              info.fileList.splice(i, 1);
          }
      }
  }
  hide() {
      this.setState({
          visible: false
      });
  }
  handleVisibleChange(visible) {
      if (this.state.disabledButtons) {
      //do nothing, the crop hasn't yet finished.
      } else {
          this.setState({ visible });
      }
  }
  handleReadyBlob(blob) {
      this.setState({ disabledButtons: false });
      this.handleVisibleChange(false);
      this.props.onChange(blob);
  }
  onChange(crop) {
      this.setState({ crop });
  }
  scale(options) {
      var scale =
      options.scale ||
      Math.min(
          options.maxWidth / options.width,
          options.maxHeight / options.height
      );
      scale = Math.min(scale, 100);
      return {
          scale: scale,
          width: options.width * scale,
          height: options.height * scale
      };
  }
  handlepreUpload(imageURL, pixelCrop) {
      this.setState({ disabledButtons: true });
      pixelCrop.originalHeight = this.state.originalDimensions.height;
      pixelCrop.originalWidth = this.state.originalDimensions.width;
      let image = new Image();
      let canvas = document.createElement('canvas');
      image.src = imageURL;
      image.setAttribute('crossOrigin', 'anonymous');

      image.onload = () => {
          var imageWidth = pixelCrop.originalWidth;
          var imageHeight = pixelCrop.originalHeight;

          var cropX = (pixelCrop.x / 100) * imageWidth;
          var cropY = (pixelCrop.y / 100) * imageHeight;

          var cropWidth = (pixelCrop.width / 100) * imageWidth;
          var cropHeight = (pixelCrop.height / 100) * imageHeight;

          var destWidth = cropWidth;
          var destHeight = cropHeight;
          var canvasWidth = cropWidth;
          var canvasHeight = cropHeight;

          if (pixelCrop.maxWidth || pixelCrop.maxHeight) {
              var scaledCrop = this.scale({
                  width: cropWidth,
                  height: cropHeight,
                  maxWidth: pixelCrop.maxWidth * 2,
                  maxHeight: pixelCrop.maxHeight * 2
              });

              // Scale the image based on the crop scale.
              // var scaledImage = this.scale({
              //     scale: scaledCrop.scale,
              //     width: imageWidth,
              //     height: imageHeight
              // });
              destWidth = scaledCrop.width;
              destHeight = scaledCrop.height;
              canvasWidth = scaledCrop.width;
              canvasHeight = scaledCrop.height;
          }

          canvas.width = canvasWidth;
          canvas.height = canvasHeight;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(
              image,
              cropX,
              cropY,
              cropWidth,
              cropHeight,
              0,
              0,
              destWidth,
              destHeight
          );
          canvas.toBlob(blob => {
              this.handleReadyBlob(blob);
              this.setState({ disabledButtons: false });
          }, 'image/jpeg');
      // const base64Image = canvas.toDataURL('image/jpg');
      };
  }
  handleUpload() {
      this.handlepreUpload(this.imageURL, this.state.crop);
  }
  render() {
      return (
          <div ref={this.containerRef} className={styles.outerWrapper}>
              <Upload
                  name="file"
                  accept=".jpg,.png"
                  showUploadList={false}
                  multiple={false}
                  onChange={info => {
                      this.handleDraggerChange(info);
                  }}
                  beforeUpload={file => {
                      if (this.createImageFromUpload(file)) {
                          this.handleVisibleChange(true);
                      }
                      return false;
                  }}
              >
                  {this.props.children}
              </Upload>
              <ModalComponent
                  visible={this.state.visible}
                  title={'Upload Photo'}
                  handleVisibleChange={this.handleVisibleChange}
              >
                  <div>
                      <div>
                          <ReactCrop
                              keepSelection={false}
                              src={this.imageURL}
                              onChange={this.onChange}
                              crop={this.state.crop}
                          />
                      </div>
                      <div>
                          {Array.isArray(this.props.aspect) && (
                              <StyledRadioButtons
                                  options={this.aspectOptions}
                                  value={this.state.crop.aspect}
                                  onChange={this.onAspectChange}
                              />
                          )}
                      </div>
                      <ModalFooter
                          cancelTitle={'Cancel'}
                          okTitle={'Upload'}
                          onCancel={() => {
                              this.handleVisibleChange(false);
                          }}
                          onSubmit={this.handleUpload}
                      />
                  </div>
              </ModalComponent>
          </div>
      );
  }
}
const mapDispatchToProps = dispatch => ({
    triggerNotification: notification => {
        dispatch(triggerNotification(notification));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(UploadCroppedPhoto);
