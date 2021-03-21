import React, { Component } from 'react'
import { Icon, Input, Select } from 'antd';
import styles from './style.module.css';
import TextInput from '../TextInput';
import moment from 'moment';

const InputGroup = Input.Group;
const Option = Select.Option;

class CombinedInputDropdown extends Component {
    constructor(props) {
        super(props);
        this.inputContainer = React.createRef();
        this.state = {
            selectEnable: false,
            selectOpen: false
        };
    }

    handleChangeSelect = (value) => {
        const val = JSON.parse(JSON.stringify(this.props.value));
        if (value === 'na') {
            val.inputValue = '';
        } else {
            this.setState({ selectEnable: true });
        }
        val.selectValue = value;
        this.props.onChange(val);
        this.hideMenu();
        
    }
    handleChangeInput = (val) => {
        this.props.onChange(Object.assign(this.props.value, { inputValue: parseInt(val) }));
    }

    showMenu = () => {
        if(this.state.selectOpen === false) this.setState({ selectOpen: true })
    }

    hideMenu = () => {
        this.setState({ selectOpen: false })
    }

    formatDate = () => {
        if(this.props.date && this.props.value.inputValue){
            const match = this.props.options.find((x) => {
                return x.key = this.props.value.selectValue;
            })

            const dateStr = moment(this.props.date).add(
                this.props.value.inputValue ? +this.props.value.inputValue : 0,
                match ? match.key : ''
            ).format('YYYY-MM-DD');
            return dateStr;
        }
        else {
            return ''
        }
    };

    render() {
        
        return (
            <div ref={this.inputContainer} className={styles.groupContainer}>
                <InputGroup compact>
                    <div className={styles.inputContainer} onClick={this.showMenu}>
                        <TextInput
                            onChange={this.handleChangeInput}
                            disabled={this.props.disabled}
                            value={this.props.value.inputValue}
                            placeholder={'NA'}
                            style={{width: '90px'}}
                            label={this.props.label} />
                    </div>
                    <div className={styles.selectContainer} onClick={this.showMenu}>
                        <Select
                            ref={this.selectRef}
                            dropdownMatchSelectWidth={false}
                            className={styles.selectClock}
                            disabled={this.props.disabled}
                            onChange={this.handleChangeSelect}
                            suffixIcon={<Icon onClick={this.showMenu} type={'clock-circle'} className={styles.selectIcon} />}
                            value={this.props.value.selectValue}
                            labelInValue={false}
                            onBlur={this.hideMenu}
                            open={this.state.selectOpen}
                            getPopupContainer={() => { return this.inputContainer.current }}
                            dropdownClassName={'selectDropdown'}
                            dropdownStyle={this.props.dropdownStyle}>
                            {this.props.options.map(option => {
                                return <Option key={option.value} value={option.value}>{option.label}</Option>;
                            }
                            )}
                        </Select>
                    </div>
                </InputGroup>
                <span style={this.props.disabled ? { opacity: '0.5' } : { opacity: 1 }} className={styles.overview}>{this.formatDate()}</span>
            </div>
        );
    }
}

export default CombinedInputDropdown
