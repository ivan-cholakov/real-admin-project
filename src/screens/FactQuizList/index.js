import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography } from 'antd';

import BlueButton from '../../components/pageWidgets/Buttons/Blue';
import SmallGreenButton from '../../components/pageWidgets/Buttons/SmallGreen';
import SmallRedButton from '../../components/pageWidgets/Buttons/SmallRed';

import styles from './style.module.css';

const { Title, Text } = Typography;
class FactQuizList extends Component {
    componentDidMount() {
        this.props.fetchQuizes();
    }

  handleCreateClick = () => {
      this.props.history.push('/system/factQuizes/create');
  };
  handleEditClick = id => () => {
      this.props.history.push(`/system/factQuizes/${id}/edit`);
  };
  handleDeleteClick = id => () => {
      this.props.deleteQuiz(id);
  };

  renderQuizes = () => {
      if (this.props.factQuizes.length) {
          return this.props.factQuizes.map(quiz => {
              return (
                  <div key={quiz.id} className={styles.quizContainer}>
                      <Title level={2}>{quiz.question}</Title>

                      <div className={styles.actionsContainer}>
                          <SmallGreenButton
                              title={'edit'}
                              onClick={this.handleEditClick(quiz.id)}
                              style={{ marginTop: '2rem' }}
                          />{' '}
                          <SmallRedButton
                              title={'delete'}
                              onClick={this.handleDeleteClick(quiz.id)}
                              style={{ marginTop: '2rem' }}
                          />
                      </div>
                  </div>
              );
          });
      }
  };
  render() {
      return (
          <div className={styles.container}>
              {this.renderQuizes()}
              {/* <div className={styles.actionButtonContainer}> */}
              <BlueButton
                  title={'CREATE A QUIZ'}
                  onClick={this.handleCreateClick}
                  className={styles.createButton}
              />
              {/* </div> */}
          </div>
      );
  }
}

export default withRouter(FactQuizList);
