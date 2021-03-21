import React, { Component } from 'react';
import styles from './style.module.css';
import ModalComponent from '../../../../../common/modal';
import TextInput from '../../../../../pageWidgets/TextInput';
import ValidationWarning from '../../../../../pageWidgets/ValidationWarning';
import { almond, pound, connectFields } from '../../../../../../assets/icons/common/icons';
import StyledRadioButtons from '../../../../../pageWidgets/StyledRadioButtons';
import ModalFooter from '../../../../../common/modal/Footer';
import DarkGreyOutlineButton from '../../../../../pageWidgets/Buttons/DarkGreyOutline';
import SmallBlueOutline from '../../../../../pageWidgets/Buttons/SmallBlueOutline';

class TopUpWallet extends Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.paymentOptions = [
            { title: 'Card #### #### 1087', value: 'Card' },
            { title: 'PayPal', value: 'PayPal' }
        ];
        this.state = { visible: false, warning: false, selected: 'Card' };
        this.handleAddIconClick = this.handleAddIconClick.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.handlePaymentMethodChange = this.handlePaymentMethodChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }
    handleAddIconClick() {
        this.handleVisibleChange(true);
    }
    handleVisibleChange(visible) {
        this.setState({ visible });
    }
    handleValueChange(name, value) {
        if (!isNaN(value)) {
            this.setState({ warning: false });
        }
        else {
            this.setState({ warning: true })
        }
        this.setState(Object.assign(this.state, {[name]: value}));
    }
    handlePaymentMethodChange(e) {
        this.setState({ selected: e.target.value });
    }
    render() {
        return (
            <div className={styles.topUpWalletContainer}>
                <SmallBlueOutline title={'Top up wallet'} onClick={this.handleAddIconClick} />
                <ModalComponent
                    visible={this.state.visible}
                    handleVisibleChange={this.handleVisibleChange}
                    title={'Top up Wallet'}
                    footer={null}
                >
                    <div className={styles.caption}>
                        Enter Amount to Add
                    </div>
                    <div className={styles.fieldsContainer}>
                        <div className={styles.connectIcon}>
                            {connectFields}
                        </div>
                        <div className={styles.fields}>
                            <div className={styles.inputContainer}>
                                <TextInput
                                    icon={pound}
                                    backgroundStyle={'grey'}
                                    value={this.state.balance}
                                    onChange={(value) => this.handleValueChange('balance', value)}
                                    placeholder={'00.00'}
                                />
                            </div>
                            <div className={styles.inputContainer}>
                                <TextInput
                                    icon={almond}
                                    backgroundStyle={'grey'}
                                    value={this.state.coinBalance}
                                    onChange={(value) => this.handleValueChange('coinBalance', value)}
                                    placeholder={'00.00'}
                                />
                            </div>
                        </div>
                    </div>

                    {this.state.warning &&
                        <div className={styles.warningContainer}>
                            <ValidationWarning warning={'Please enter a number.'} />
                        </div>
                    }
                    <div className={styles.choosePayment}>
                        <div className={styles.caption}>
                            Select Payment Method
                        </div>
                        <div className={styles.radioContainer}>
                            <StyledRadioButtons
                                multiline={true}
                                value={this.state.selected}
                                onChange={this.handlePaymentMethodChange}
                                options={this.paymentOptions}
                            />
                        </div>
                        <div className={styles.btnContainer}>
                            <DarkGreyOutlineButton
                                icon={'plus'}
                                title={'ADD PAYMENT METHOD'}
                                onClick={() => { }}
                            />
                        </div>
                    </div>
                    <div className={styles.topUpButtons}>
                        <ModalFooter okTitle={'Make Payment'} cancelTitle={'Cancel'} onCancel={() => { this.handleVisibleChange(false) }} onSubmit={() => { this.handleVisibleChange(false) }} />
                    </div>
                </ModalComponent>

            </div>
        );
    }
}

export default TopUpWallet
