import React, { Component } from 'react';
import { Radio } from 'antd';
import styles from './style.module.css';

class StyledRadioButtons extends Component {
    render() {
        const radioStyle = {
            display: 'block',
            marginBottom: '12px'
        };
        return (
            <div className={styles.radioWrapper}>
                <Radio.Group
                    name="radiogroup"
                    disabled={this.props.disabled}
                    onChange={this.props.onChange}
                    value={this.props.value}>
                    {this.props.options.map(option => (
                        <div
                            key={option.value}
                            className={styles.radioContainer}
                            style={this.props.multiline? radioStyle : {}} >
                            <Radio value={option.value} className={styles.radioButton}>{option.title} </Radio>
                            {option.description &&
                                <span className={styles.description}>{option.description}</span>
                            }
                        </div>
                    ))}
                </Radio.Group>
            </div>
        );
    }
}

export default StyledRadioButtons
