import React, { Component } from 'react';
import styles from './style.module.css';
import { Select } from 'antd';


class StyledDropdown extends Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
    }
    componentDidMount() {

    }

    render() {
        const inlineClass = this.props.inline? styles.inline : '';
        const backgroundClass = this.props.backgroundStyle === 'grey'? styles.greyBackground : styles.whiteBackground;

        let options = this.props.options;

        if(!options){
            options = []
        }

        return (
            <div className={[styles.dropDown, inlineClass, backgroundClass].join(' ')} ref={this.containerRef}>
                <label className={styles.inputLabel} hidden={!this.props.label}>{this.props.label}</label>
                <Select
                    style={{background: (this.props.backgroundStyle === 'grey')? '#f8f7f7' : '#fff'}}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    placeholder={this.props.placeholder}
                    disabled={this.props.disabled}
                    getPopupContainer={() => {return this.containerRef.current}}
                    dropdownMatchSelectWidth={this.props.dropdownWidthMatch}
                >
                    {options.map(option => (
                        <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
                    ))}
                </Select>
            </div>
        );
    }
}

export default StyledDropdown
