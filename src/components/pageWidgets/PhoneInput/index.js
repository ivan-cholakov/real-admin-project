import React, { Component } from 'react';
import Flag from 'react-flags';

import styles from './style.module.css';
import * as antd from 'antd';
import {Tooltip} from 'antd';

const { Input, Select } = antd;
const InputGroup = Input.Group;
const Option = Select.Option;

class PhoneInput extends Component {
    constructor(props) {
        super(props);
        this.inputContainer = React.createRef();
        this.inputField = React.createRef();
        this.state = {
            prefix: props.value.prefix,
            number: props.value.number,
        };
    }

    componentDidUpdate(prevProps) {
        if (
            (prevProps.value.prefix !== this.props.value.prefix) ||
            (prevProps.value.number !== this.props.value.number)
        ) {
            this.setState({
                ...this.state,
                number: this.props.value.number.replace(/ /g,''),
                prefix: this.props.value.prefix,
            })
        }
    }

    formatPhoneData(data){
        if(!data){
            data = []
        }

        return data.map( (item) => {
            return {
                code: item.code,
                dialCode: item.dialCode,
                name: item.name
            }
        });
    }
    componentDidMount() {
        this.setState({value: this.props.defaultValue});
        if(!this.props.dontSelect) {
            const input = this.inputContainer.current.getElementsByTagName('input')[0];
            input.onfocus = () => {
                if(this.state.value === this.props.defaultValue) {
                    input.select();
                }
            }
        }
    }
    onSelect = (value) => {
        const newState = {
            ...this.state,
            prefix: value,
        }
        this.props.onChange(newState);
        this.setState(newState);
    };

    onChange = (e) => {
        const { value } = e.target;
        if(value.match(/^([0-9 ]+)$|^$/) != null){
            const newState = {
                ...this.state,
                number: value
            }   
            this.props.onChange(newState);
            this.setState(newState);
        }
    };
    render() {
        const inlineClass = this.props.inline? styles.inline : '';
        const colorClassName = this.props.grayColor? styles.grayColor : '';
        const options = this.formatPhoneData(this.props.options);
        return (
            <div
                className={[styles['tooltip-title'],
                    styles.textInput, colorClassName,
                    inlineClass, this.props.disabled? 'disabled' : ''].join(' ')}
                ref={this.inputContainer}>
                <div className={styles.labelContainer}>
                    <label className={styles.inputLabel} hidden={!this.props.label}>{this.props.label}</label>
                    <Tooltip overlayClassName={styles.tooltip}  placement="rightTop" title={this.props.tooltipContent}>
                        <div>{this.props.tooltipTitle}</div>
                    </Tooltip>
                </div>
                <InputGroup className={styles.inputContainer} compact>
                    <Select
                        dropdownClassName={'phoneDropdown'}
                        dropdownMatchSelectWidth={false}
                        value={this.state.prefix}
                        disabled={this.props.disabled}
                        onSelect={this.onSelect}
                        optionLabelProp={'label'}
                        getPopupContainer={trigger => trigger.parentNode}
                    >
                        {options.map((option) => (
                            <Option
                                key={option.dialCode}
                                label={option.dialCode}
                                value={option.dialCode}>
                                <Flag
                                    basePath={'/flags'}
                                    format="png"
                                    pngSize={32}
                                    name={option.code.toLowerCase()}
                                    shiny={true} />{option.name} {option.dialCode}</Option>
                        ))}
                    </Select>
                    <Input
                        style={{background: (this.props.backgroundStyle === 'grey')? '#f8f7f7' : '#fff',
                            border: this.props.border? this.props.border: ''}}
                        disabled={this.props.disabled}
                        onChange={this.onChange}
                        value={this.state.number}
                        placeholder={this.props.placeholder}
                    />
                </InputGroup>
            </div>
        );
    }
}

export default PhoneInput
