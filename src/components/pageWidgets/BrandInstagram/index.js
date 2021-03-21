import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './style.module.css';
import { triggerNotification } from '../../common/Notification/actions';
import UploadFormLayout from '../Upload/FormLayout';
import ImagesGrid from '../ImagesGrid';
import { Config } from '../../../core/config';
import WindowPortal from '../../common/WindowPortal';

const config = new Config();

const instagramCredentials = config.getInstagramCredentials();

class BrandInstagram extends Component {
    constructor(props) {
        super(props);

        this.imagesData = props.feed;

        this.state = {
            instagramFeed: !!props.feed.length,
            profile: null,
            instagramAccessTokenExists: false,
            shouldOpenInstagramPortal: false,
            access_token: null
        };
    }

    componentDidMount() {
        this.props.instagramToken &&
      this.fetchInstagramData(this.props.instagramToken);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevState.access_token && this.state.access_token) {
            this.props.onAuthorized(this.state.access_token);
        }

        if (!prevProps.instagramToken && this.props.instagramToken) {
            this.fetchInstagramData(this.props.instagramToken);
        }
    }

  fetchInstagramData = token => {
      fetch(
          `https://api.instagram.com/v1/users/self/media/recent?access_token=${token}`
      )
          .then(response => {
              return response.json();
          })
          .then(body => {
              if (body.meta.code === 200) {
                  //200 = OK
                  if (body.data.length) {
                      const profile = body.data[0].user;
                      let briefImageData = body.data.map((x, i) => {
                          const caption = x.caption ? x.caption.text : null;
                          return {
                              caption,
                              index: i,
                              link: x.link,
                              likes: x.likes.count,
                              url: x.images.standard_resolution.url
                          };
                      });
                      this.setState({ profile });
                      this.handleInstagramFeed(briefImageData);
                  }
              } else {
                  this.props.triggerNotification({
                      type: 'error',
                      msg: 'There was a problem fetching your instagram feed.',
                      duration: 5
                  });
              }
          })
          .catch(() => {
              this.props.triggerNotification({
                  type: 'error',
                  msg: 'There was a problem fetching your instagram feed.',
                  duration: 5
              });
          });
  };

  handleAddIconClick = () => {
      this.setState({
          shouldOpenInstagramPortal: !this.state.shouldOpenInstagramPortal
      });
  };
  addAccessTokenToState = access_token => {
      if (!this.state.access_token) {
          this.setState({
              access_token,
              instagramAccessTokenExists: Boolean(this.state.access_token)
          });
      }
  };

  handleInstagramFeed = images => {
      this.props.onImageData(images);
      this.imagesData = images;
      this.setState({ instagramFeed: true });
  };

  stopPortalRendering = () => {
      this.setState({ shouldOpenInstagramPortal: false });
  };

  render() {
      const backgroundStyle = this.props.backgroundStyle
          ? styles[this.props.backgroundStyle]
          : styles.grey;

      return (
          <div
              className={[styles.brandInstagramContainer, backgroundStyle].join(' ')}
          >
              {!this.state.instagramFeed && (
                  <UploadFormLayout
                      onClick={this.handleAddIconClick}
                      title={'Add Instagram Feed'}
                  />
              )}
              {this.state.instagramFeed && (
                  <div
                      className={styles.imageContainer}
                      onClick={this.handleAddIconClick}
                  >
                      <ImagesGrid preload={true} images={this.imagesData} />
                  </div>
              )}

              {this.state.shouldOpenInstagramPortal && (
                  <WindowPortal
                      addAccessTokenToState={this.addAccessTokenToState}
                      stopPortalRendering={this.stopPortalRendering}
                  >
            Authenticating...
                  </WindowPortal>
              )}
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
)(BrandInstagram);
