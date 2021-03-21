import React, { Component } from 'react';
import { Input, Tooltip } from 'antd';
import styles from './style.module.css';

class TextInput extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.inputContainer = React.createRef();
        this.getField = this.getField.bind(this);
    }
    componentDidMount() {
        if (this.props.defaultValue) {
            this.props.onChange(this.props.defaultValue);
        }
        if (!this.props.dontSelect) {
            if (this.props.type !== 'textarea') {
                const input = this.inputContainer.current.getElementsByTagName('input')[0];
                input.onfocus = () => {
                    if (this.props.value === this.props.defaultValue) {
                        input.select();
                    }
                }
            }
        }
    }
    onChange = (e) => {
        const { value } = e.target;
        if (this.props.type === 'number') {
            if (!Number.isNaN(value) || value === '') {
                this.props.onChange(value);
            }
        } else {
            if (this.props.type === 'id') {
                this.props.onChange(this.formatId(value));
            } else {
                this.props.onChange(value);
            }
        }
    };

    formatId = (value) => {
        if (value) {
            while (value.charAt(0) === '#') {
                value = value.substr(1);
            }
            return '#' + value
        }
        return value;
    };

    onKeyPress(event) {
        if (this.props.type === 'number') {
            const keyCode = event.keyCode || event.which;
            const keyValue = String.fromCharCode(keyCode);
            if (/\+|-/.test(keyValue)) {
                event.preventDefault();
            }
        }
    }

    getField(props) {
        const type = props.type;

        switch (type) {
        case 'textarea':
            return <Input.TextArea
                rows={3}
                value={this.props.value}
                disabled={this.props.disabled}
                onChange={this.onChange}
                onClick={this.props.onClick}
                style={{
                    ...this.props.style,
                    background: (this.props.backgroundStyle === 'grey') ? '#f8f7f7' : '#fff',
                    border: this.props.border ? this.props.border : ''
                }}
                placeholder={this.props.placeholder}
                defaultValue={this.props.defaultValue}
            />;
        case 'password':
            return <Input.Password
                value={this.props.value}
                disabled={this.props.disabled}
                onChange={this.onChange}
                onClick={this.props.onClick}
                style={{ ...this.props.style, border: this.props.border ? this.props.border : '' }}
                placeholder={this.props.placeholder}
                defaultValue={this.props.defaultValue}
                className={styles.password}
                autoComplete={'new-password'}
            />;
        case 'id':
            return <Input
                value={this.formatId(this.props.value)}
                disabled={this.props.disabled}
                onChange={this.onChange}
                onClick={this.props.onClick}
                style={{ ...this.props.style, border: this.props.border ? this.props.border : '' }}
                placeholder={this.props.placeholder}
                defaultValue={this.props.defaultValue}
                className={styles.password}
            />;
        default:
            return <Input
                value={this.props.value}
                suffix={this.props.valueSuffix}
                min={this.props.min}
                onKeyPress={this.onKeyPress}
                onClick={this.props.onClick}
                disabled={this.props.disabled}
                onChange={this.onChange}
                style={{
                    ...this.props.style,
                    background: (this.props.backgroundStyle === 'grey') ? '#f8f7f7' : '#fff',
                    border: this.props.border ? this.props.border : ''
                }}
                placeholder={this.props.placeholder}
                defaultValue={this.props.defaultValue}
                type={this.props.type}
            />
        }
    }

    render() {
        const hasIcon = this.props.icon ? styles.hasIcon : '';
        const inlineClass = this.props.inline ? styles.inline : '';
        const colorClassName = this.props.grayColor ? styles.grayColor : '';
        return (
            <div
                className={[styles.textInput, colorClassName, inlineClass, this.props.disabled ? 'disabled' : ''].join(' ')}
                ref={this.inputContainer}>
                <div className={[styles.labelContainer, this.props.labelPosition].join(' ')}>
                    <label className={styles.inputLabel} hidden={!this.props.label}>{this.props.label}</label>
                    <Tooltip
                        className={styles['tooltip-title']}
                        overlayClassName={styles.tooltip}
                        placement="rightTop"
                        title={this.props.tooltipContent}>
                        <div>{this.props.tooltipTitle}</div>
                    </Tooltip>
                </div>
                <div className={[styles.inputContainer, hasIcon].join(' ')}>
                    {this.props.icon &&
                        <div className={styles.iconContainer} style={{ background: (this.props.backgroundStyle === 'grey') ? '#f8f7f7' : '#fff' }}>
                            {this.props.icon}
                        </div>
                    }
                    {this.getField(this.props)}
                </div>
            </div>
        );
    }
}

export default TextInput
