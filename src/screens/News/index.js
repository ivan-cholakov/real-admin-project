import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { client } from '../../core/client';
import { Config } from '../../core/config';

import styles from './style.module.css';

const config = new Config();

class News extends Component {
    componentDidMount() {
        this.props.getAPieceOfNews(this.props.match.params.id);
    }
  handleEditClick = () => {
      this.props.history.push(`/news/${this.props.match.params.id}/edit`);
  };
  render() {
      const baseUrl = `${config.getBaseUrl()}/storage`;
      const token = client.auth.getSessionToken();
      return (
          this.props.aPieceOfNews && (
              <div className={styles.container}>
                  <h2>{this.props.aPieceOfNews.heading}</h2>
                  <img
                      src={`${baseUrl}${
                          this.props.aPieceOfNews.image
                      }?token=${token}&width=300&height=200&quality=80`}
                  />
                  <p>{this.props.aPieceOfNews.content}</p>
              </div>
          )
      );
  }
}

export default withRouter(News);
