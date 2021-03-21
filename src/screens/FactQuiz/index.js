import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Icon } from 'antd';
import _ from 'lodash';

import TextInput from '../../components/pageWidgets/TextInput';
import SmallGreenButton from '../../components/pageWidgets/Buttons/SmallGreen';
import Dropdown from '../../components/pageWidgets/Dropdown';

import styles from './style.module.css';
import BlueButton from '../../components/pageWidgets/Buttons/Blue';

const { Title, Text } = Typography;

class FactQuizForm extends Component {
  state = {
      question: '',
      categoryId: '',
      facts: this.props.facts || [],
      answers: this.props.answers || [],
      fact: '',
      answer: { answer: '', correct: false }
  };
  componentDidMount() {
      if (this.props.editing) {
          this.props.getQuiz(this.props.match.params.id);
      } else {
          this.props.getCategories();
      }
  }
  componentDidUpdate(prevProps) {
      if (!prevProps.factQuiz && this.props.factQuiz) {
          const { question, categoryId, facts, answers } = this.props.factQuiz;
          this.setState({ question, categoryId, facts, answers });
      }
  }

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
  handleSubmit = () => {
      const quiz = {
          question: this.state.question,
          categoryId: this.state.categoryId,
          facts: this.state.facts,
          answers: this.state.answers
      };
      this.props.onFormSubmit({ ...this.props.factQuiz, ...quiz });
      this.props.history.push('/factQuizes');
  };
  handleAdd = field => () => {
      this.setState({
          [`${field}s`]: this.state[`${field}s`].concat(this.state[field]),
          [field]: field === 'answer' ? { answer: '', correct: false } : ''
      });
  };
  onInputChange = field => value => {
      if (field === 'answer') {
          this.setState({ [field]: { ...this.state[field], [field]: value } });
      } else {
          this.setState({ [field]: value });
      }
  };

  onDelete = (field, text) => () => {
      this.setState({
          [`${field}s`]: this.state[`${field}s`].filter(f => f !== text)
      });
  };

  changeCorrectness = (field, f) => () => {
      this.setState({
          [`${field}s`]: this.state[`${field}s`]
              .filter(entry => !_.isEqual(entry, f))
              .concat({ ...f, correct: !f.correct })
      });
  };
  renderForm = field => {
      const label = field.charAt(0).toUpperCase() + field.slice(1);
      return (
          <div className={styles[`${field}sContainer`]}>
              <Title level={3}>Add {field}</Title>
              <TextInput
                  grayColor
                  placeholder={label}
                  value={
                      field === 'answer' ? this.state[field][field] : this.state[field]
                  }
                  onChange={this.onInputChange(field)}
                  className={styles.input}
              />
              <SmallGreenButton
                  title={`Add ${field}`}
                  onClick={this.handleAdd(field)}
              />
          </div>
      );
  };

  renderEntityArray = field => {
      return (
          <div>
              <Title level={3}>{`${field}s`}</Title>
              {this.state[`${field}s`].map(f => (
          <>
            {field === 'answer' ? (
                <Text>
                Answer: {f[field]}{' '}
                    <span onClick={this.changeCorrectness(field, f)}>
                  Correct: {f.correct.toString()}
                    </span>{' '}
                    <Icon onClick={this.onDelete(field, f)} type="delete" />
                </Text>
            ) : (
                <Text>
                    {field}: {f}
                    <Icon onClick={this.onDelete(field, f)} type="delete" />
                </Text>
            )}
            <br />
          </>
              ))}
          </div>
      );
  };

  renderEntity = field => {
      return (
          <div className={styles[`${field}Container`]}>
              {this.renderForm(field)}
              {!!this.state[`${field}s`].length && this.renderEntityArray(field)}
          </div>
      );
  };
  render() {
      return (
          <div className={styles.container}>
              <Title level={2}>
                  {this.props.editing ? 'Edit a quiz' : 'Create a quiz'}
              </Title>

              <Dropdown
                  underlined
                  value={this.state.categoryId}
                  onChange={this.onInputChange('categoryId')}
                  label="Categories"
                  placeholder="Select"
                  items={this.formatCategoriesData()}
              />
              {this.renderEntity('fact')}
              <TextInput
                  placeholder="Question"
                  value={this.state.question}
                  grayColor
                  onChange={this.onInputChange('question')}
              />
              {this.renderEntity('answer')}
              <BlueButton
                  title={this.props.editing ? 'Update' : 'Create'}
                  onClick={this.handleSubmit}
              />
          </div>
      );
  }
}

export default withRouter(FactQuizForm);
