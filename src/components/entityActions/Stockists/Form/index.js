import React, { Component } from 'react';
import styles from './style.module.css';
import {Input} from 'antd';
import StyledDropdown from '../../../../components/pageWidgets/StyledDropdown';
import {countries} from '../../../../assets/other/countries';

class stockistForm extends Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.stockistNameInput = React.createRef();
        this.stockistDescriptionInput = React.createRef();
        this.stockistProductInput = React.createRef();
        this.stockistStreetInput = React.createRef();
        this.stockistCityInput = React.createRef();
        this.stockistZipCodeInput = React.createRef();
        this.stockistProvinceInput = React.createRef();
        this.stockistCountryInput = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    componentDidMount() {
        this.props.resetValidationErrors();
        this.container.current.addEventListener('keypress', this.handleKeyPress);
    }
    componentWillUnmount() {
        this.container.current.removeEventListener('keypress', this.handleKeyPress);
    }
    handleKeyPress(e) {
        const key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            this.handleSubmit();
        }
    }
    handleSubmit() {
        const stockist = {
            displayName: this.stockistNameInput.current.input.value,
            description: this.stockistDescriptionInput.current.textAreaRef.value,
            productId: this.stockistProductInput.value,
        };
        this.props.onFormSubmit(stockist);
    }

    formatData(data){
        if(!data){
            data = []
        }

        return data.map( (item) => {
            return {
                label: item.name ? item.name : item.companyName,
                value: item.code,
            }
        });
    }
    

    render() {
        let stockistData = this.props.stockistData;
        if(!stockistData.address) {
            stockistData.address = []
        }
        return (
            <div className={styles.formWrapper} ref={this.container}>
                <div className={styles.fieldLabel}>
                    Name
                </div>
                <Input ref={this.stockistNameInput} value={stockistData.name} />
                <div className={styles.warningField}>
                    {this.props.validationErrors.name}
                </div>

                <div className={styles.fieldLabel}>
                    Street
                </div>
                <Input ref={this.stockistStreetInput} value={stockistData.address.street} />
                <div className={styles.warningField}>
                    {this.props.validationErrors.name}
                </div>

                <div className={styles.fieldLabel}>
                    City
                </div>
                <Input ref={this.stockistCityInput} value={stockistData.address.city} />
                <div className={styles.warningField}>
                    {this.props.validationErrors.name}
                </div>

                <div className={styles.fieldLabel}>
                    zipCode
                </div>
                <Input ref={this.stockistZipCodeInput} value={stockistData.address.zipCode} />
                <div className={styles.warningField}>
                    {this.props.validationErrors.name}
                </div>

                <div className={styles.fieldLabel}>
                    Province
                </div>
                <Input ref={this.stockistProvinceInput} value={stockistData.address.province} />
                <div className={styles.warningField}>
                    {this.props.validationErrors.name}
                </div>

                <div className={styles.fieldLabel}>
                    Country
                </div>
                <StyledDropdown ref={(input) => this.stockistCountryInput = input} value={stockistData.address.country} options={this.formatData(countries)}/>

                <div className={styles.warningField}>
                    {this.props.validationErrors.description}
                </div>



                
                <div onClick={this.handleSubmit} className={styles.submitBtn}>Submit</div>
            </div>
        )
    }
}



export default stockistForm
