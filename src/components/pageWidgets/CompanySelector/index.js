import React, { Component } from 'react';
import styles from './style.module.css';
import { Select } from 'antd';
const Option = Select.Option;


class CompanySelector extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {currentSelection: ''};
    }
    
    handleChange(value) {
        this.props.selectCompany(value);
        this.setState({currentSelection: value});
    }
    componentDidMount() {
        this.props.selectCompany(this.props.companies[0].id);
        this.currentlySelected = this.props.companies[0].id;
    }
    componentDidUpdate() {
        const match = this.props.companies.find((x) => {
            return x.id === this.currentlySelected;
        });
        if(!match) {
            //currently selected company was deleted.
            this.handleChange(this.props.companies[0].id);
        }
    }
    render() {

        const selectValue = !this.state.currentSelection? this.props.companies[0].id : this.state.currentSelection;
        const options = this.props.companies.map((x) => {
            return <Option key={x.id} value={x.id}>{x.name}</Option>;
        })
        return (
            
            <div className={styles.selectorWrapper}>
                <Select
                    showSearch
                    className={styles.select}
                    style={{ width: 200 }}
                    value={selectValue}
                    optionFilterProp="children"
                    ref={this.selectRef}
                    onChange={this.handleChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {options}
                </Select>
            </div>
        )
    }
}



export default CompanySelector
