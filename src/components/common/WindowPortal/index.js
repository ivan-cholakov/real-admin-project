import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Config } from '../../../core/config';

const config = new Config();

class WindowPortal extends Component {
  containerElement = document.createElement('div');
  externalWindow = null;

  state = {
      shouldClose: false
  };

  componentDidMount() {
      this.externalWindow = window.open(
          `${config.getBaseUrl()}${config.getInstagramAuthUrl()}`,
          '',
          'width=600,height=400,left=200,top=200'
      );
      this.externalWindow.document.body.appendChild(this.containerElement);
  }

  render() {
      var eventMethod = window.addEventListener
          ? 'addEventListener'
          : 'attachEvent';
      var eventer = window[eventMethod];
      var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';
      eventer(
          messageEvent,
          e => {
              this.props.addAccessTokenToState(e.data.access_token);
              this.setState({ shouldClose: Boolean(e.data.access_token) });
          },
          false
      );

      if (this.state.shouldClose) {
          this.externalWindow.close();
          this.props.stopPortalRendering();
      }

      return ReactDOM.createPortal(this.props.children, this.containerElement);
  }
}

export default WindowPortal;
