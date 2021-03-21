import React, { Component } from 'react';
import styles from './style.module.css';
import TextInput from '../../../../pageWidgets/TextInput';
import StyledRadioButtons from '../../../../pageWidgets/StyledRadioButtons';
import SectionTitle from '../../../../pageWidgets/SectionTitle';
import BlueButton from '../../../../pageWidgets/Buttons/Blue';

class AddPayment extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: 'Card', selected2: 'different', formData: {} };
        this.options = [
            { value: 'Card', title: 'Debit / Credit card', description: 'VISA - MasterCard - AMEX' },
            { value: 'Paypal', title: 'Paypal' }
        ];
        this.options2 = [
            { value: 'registered', title: 'Registered Address' },
            { value: 'different', title: 'Different Address' }
        ]
    }
    onChange = (e) => {
        this.setState({
            selected: e.target.value,
        });
    }
    onFieldChange = (field, val) => {
        this.setState(Object.assign(this.state.formData, { [field]: val }));
    }
    onAddressChange = (e) => {
        this.setState({
            selected2: e.target.value,
        });
    }
    render() {
        return (
            <div className={styles.contentContainer}>
                <div className={styles.balanceContainer}>
                    <div className={styles.coins}>
                        <span>0.00</span>
                        ALMD
                    </div>
                    <div className={styles.money}>
                        £0.00
                    </div>
                </div>
                <div className={styles.line} />
                <div className={styles.cardType}>
                    <StyledRadioButtons options={this.options} value={this.state.selected} onChange={this.onChange} />
                </div>
                <div className={styles.cardInformation}>
                    <div className={styles.cardNumberContainer}>
                        <TextInput
                            label={'Card Number'}
                            value={this.state.formData.card}
                            placeholder={'Enter card number'}
                            onChange={(val) => { this.onFieldChange('card', val) }}
                        />
                    </div>
                    <div className={styles.expiryDate}>
                        <TextInput
                            label={'Expiry Date'}
                            placeholder={'MM/YYYY'}
                            type={'text'}
                            value={this.state.formData.date}
                            onChange={(val) => { this.onFieldChange('date', val) }}
                        />
                    </div>
                    <div className={styles.securityCode}>
                        <TextInput
                            label={'Security code'}
                            placeholder={'CVV'}
                            type={'number'}
                            value={this.state.formData.cvv}
                            onChange={(val) => { this.onFieldChange('cvv', val) }}
                        />
                    </div>
                </div>
                <div className={styles.cardInformation2}>
                    <div className={styles.cardName}>
                        <TextInput
                            label={'Name on Card'}
                            placeholder={'e.g Almond Impact Ltd'}
                            value={this.state.formData.name}
                            onChange={(val) => { this.onFieldChange('name', val) }}
                        />
                    </div>
                    <div className={styles.cardAddress}>
                        <StyledRadioButtons options={this.options2} value={this.state.selected2} onChange={this.onAddressChange} multiline={true} />
                    </div>
                    <div className={styles.address}>
                        242 Acklam Road,
                        Westbourn Studios
                        W10 6NG, London,
                        UK
                    </div>
                </div>
                <div className={styles.sectionWrapper}>
                    <div className={styles.sectionTitleContainer}>
                        <SectionTitle title={'Billing Address'} onChange={(val) => { this.onFieldChange('BillingAddress', val) }} />
                    </div>
                    <div className={styles.billingInformation}>
                        <div className={styles.billingAddress}>
                            <TextInput
                                label={'Address'}
                                placeholder={'e.g. 242 Primrose Hill'}
                                value={this.state.formData.address}
                                onChange={(val) => { this.onFieldChange('address', val) }}
                            />
                        </div>
                        <div className={styles.city}>
                            <TextInput
                                label={'City'}
                                placeholder={'e.g London'}
                                value={this.state.formData.city}
                                onChange={(val) => { this.onFieldChange('city', val) }}
                            />
                        </div>
                    </div>
                    <div className={styles.billingInfo2}>
                        <div className={styles.postCode}>
                            <TextInput
                                label={'Postcode'}
                                placeholder={'e.g. W10 6NJ'}
                                value={this.state.formData.postcode}
                                onChange={(val) => { this.onFieldChange('postcode', val) }}
                            />
                        </div>
                        <div className={styles.country}>
                            <TextInput
                                label={'Country'}
                                placeholder={'e.g. United Kingdom'}
                                value={this.state.formData.country}
                                onChange={(val) => { this.onFieldChange('country', val) }}
                            />
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <BlueButton title={'Next'} onClick={() => { this.props.changeActiveComponent(2) }} />
                    </div>
                </div>

            </div>
        );
    }
}

export default AddPayment;

