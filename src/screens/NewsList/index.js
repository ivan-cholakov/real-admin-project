import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Parser } from 'html-to-react';

import { client } from '../../core/client';
import { Config } from '../../core/config';

import BlueButton from '../../components/pageWidgets/Buttons/Blue';

import SmallGreenButton from '../../components/pageWidgets/Buttons/SmallGreen';
import SmallRedButton from '../../components/pageWidgets/Buttons/SmallRed';

import styles from './style.module.css';

const config = new Config();
const HtmlToReactParser = new Parser();

class NewsList extends Component {
    async componentDidMount() {
        await this.props.getNews();
    }

  onEditButtonClick = id => () => {
      this.props.history.push(`/system/news/${id}/edit`);
  };

  onCreateButtonClick = () => {
      this.props.history.push('/system/news/create');
  };

  onDeleteButtonClick = id => () => {
      this.props.deleteAPieceOfNews(id);
  };

  renderNews = () => {
      const baseUrl = `${config.getBaseUrl()}/storage`;
      const token = client.auth.getSessionToken();

      return (
          this.props.news &&
      this.props.news.map(aPieceOfNews => (
          <section key={aPieceOfNews.id} className={styles.aPieceOfNews}>
              <h2>{aPieceOfNews.heading}</h2>
              {aPieceOfNews.image && (
                  <img
                      src={`${baseUrl}${
                          aPieceOfNews.image
                      }?token=${token}&width=300&height=200&quality=80`}
                  />
              )}
              <p>{HtmlToReactParser.parse(aPieceOfNews.content)}</p>
              <div className={styles.buttonsContainer}>
                  <SmallGreenButton
                      onClick={this.onEditButtonClick(aPieceOfNews.id)}
                      title="EDIT"
                      className={styles.saveButton}
                  />
                  <SmallRedButton
                      onClick={this.onDeleteButtonClick(aPieceOfNews.id)}
                      title="DELETE"
                      className={styles.deleteButton}
                  />
              </div>
          </section>
      ))
      );
  };
  render() {
      return (
          <div className={styles.container}>
              {this.renderNews()}
              <BlueButton
                  onClick={this.onCreateButtonClick}
                  className={styles.createButton}
                  title="CREATE"
              />
          </div>
      );
  }
}

export default withRouter(NewsList);
