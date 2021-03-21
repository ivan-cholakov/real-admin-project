import React, {Component} from 'react';
import {AutoComplete, Tooltip} from 'antd';
import styles from './style.module.css';
import { Icon } from 'antd';
import _ from 'lodash';

const Option = AutoComplete.Option;

class StyledAutoComplete extends Component {
    constructor(props){
        super(props);
        this.inputContainer = React.createRef();
    }
    formatData(data){
        if(!data){
            data = []
        }

        return data.map( (item) => {
            return {
                label: item.name,
                value: item.code,
            }
        });
    }

    state = {
        value: ''
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.value, this.props.value)) {
            this.setState({value: this.props.value});
        }
    }

    onSelect = (value) => {
        this.props.onChange(value);
        this.setState({value: value});
    };

    /**
     * Set the wrapper ref
     */
    setWrapperRef = (node) => {
        this.inputContainer = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleFocusOut = () => {
        let exists = Object.keys(this.props.dataSource).some( (k) => {
            return this.props.dataSource[k].code === this.state.value;
        });
        if(!exists){
            this.props.onChange('');
        }
    }

    render() {
        let dataSource = this.formatData(this.props.dataSource);
        if(!dataSource){
            dataSource = []
        }

        const options = dataSource.map(option => (
            <Option key={option.value} value={option.value}>
                {option.label}
            </Option>
        ));

        const inlineClass = this.props.inline? styles.inline : '';
        const colorClassName = this.props.grayColor? styles.grayColor : '';
        return (
            <div className={[styles.autoComplete, colorClassName, inlineClass, this.props.disabled? 'disabled' : ''].join(' ')}>
                <div className={styles.labelContainer}>
                    <label className={styles.inputLabel} hidden={!this.props.label}>{this.props.label}</label>
                    <Tooltip overlayClassName={styles.tooltip}  placement="rightTop" title={this.props.tooltipContent}>
                        <div>{this.props.tooltipTitle}</div>
                    </Tooltip>
                </div>
                <AutoComplete
                    value={this.props.value}
                    style={{border: this.props.border? this.props.border: ''}}
                    dataSource={options}
                    onSelect={this.onSelect}
                    onBlur={this.handleFocusOut}
                    getPopupContainer={trigger => trigger.parentNode}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    filterOption={(inputValue, option) =>
                        option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                /><Icon type="down"/>
            </div>
        );
    }
}


export default StyledAutoComplete
