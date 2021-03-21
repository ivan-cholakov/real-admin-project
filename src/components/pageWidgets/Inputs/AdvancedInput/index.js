import React, { Component } from 'react';
import { Input } from 'antd';
import styles from './style.module.css';

class AdvancedInput extends Component {
    // takes props Type, prefix and suffix and onchange strips them and passes value to parent.
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.inputContainer = React.createRef();
    }
    componentDidMount() {
    }
    onChange = (e) => {
        const { value } = e.target;
        this.props.onChange(this.stripValue(value));
    };
    formatValue = (val) => {
        if(this.props.prefix) {
            return this.props.prefix + `${val}`;
        }
        if(this.props.suffix) {
            return `${val}${this.props.suffix}`
        }
    }
    stripValue = (val) => {
        val = val.toString();
        const symbol = this.props.prefix? this.props.prefix : this.props.suffix;
        const regExp = new RegExp(symbol, 'g');
        const stripped = val.replace(regExp, '');
        return stripped;
    }

    render() {
        const hasIcon = this.props.icon ? styles.hasIcon : '';
        const inlineClass = this.props.inline ? styles.inline : '';
        const colorClassName = this.props.grayColor ? styles.grayColor : '';
        const displayValue = this.formatValue(this.props.value);
        return (
            <div
                className={[styles.textInput, colorClassName, inlineClass, this.props.disabled ? 'disabled' : ''].join(' ')}
                ref={this.inputContainer}>
                <div className={[styles.labelContainer, this.props.labelPosition].join(' ')}>
                    <label className={styles.inputLabel} hidden={!this.props.label}>{this.props.label}</label>
                </div>
                <div className={[styles.inputContainer, hasIcon].join(' ')}>
                    {this.props.icon &&
                        <div className={styles.iconContainer} style={{ background: (this.props.backgroundStyle === 'grey') ? '#f8f7f7' : '#fff' }}>
                            {this.props.icon}
                        </div>
                    }
                    <Input
                        value={displayValue}
                        min={this.props.min}
                        onClick={this.props.onClick}
                        disabled={this.props.disabled}
                        onChange={this.onChange}
                        style={{
                            ...this.props.style,
                            background: (this.props.backgroundStyle === 'grey') ? '#f8f7f7' : '#fff',
                            border: this.props.border ? this.props.border : ''
                        }}
                        placeholder={this.props.placeholder}
                        type={this.props.type? this.props.type : 'text'}
                    />
                </div>
            </div>
        );
    }
}

export default AdvancedInput
