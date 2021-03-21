import React, { Component } from 'react';
import styles from './style.module.css';
import { DatePicker } from 'antd';
import moment from 'moment';

class StyledDatePicker extends Component {
    onChange = (value) => {
        const val = value === null? null : moment(value).valueOf();
        this.props.onChange(val);
    }
    render() {
        const val = this.props.value === null? null : moment(this.props.value);
        return (
            <div className={[styles.datePickerContainer, this.props.disabled? 'disabled' : ''].join(' ')}>
                <label className={styles.inputLabel} hidden={!this.props.label}>{this.props.label}</label>
                <DatePicker
                    style={{background: (this.props.backgroundStyle === 'grey')? '#f8f7f7' : '#fff', opacity: this.props.disabled? '0.5': ''}}
                    className={'datePicker'}
                    dropdownClassName={styles.dropDownDate}
                    placeholder={this.props.placeholder}
                    disabled={this.props.disabled}
                    value={val}
                    onChange={this.onChange}
                    getCalendarContainer={trigger => trigger.parentNode}/>
            </div>
        )
    }
}

export default StyledDatePicker
