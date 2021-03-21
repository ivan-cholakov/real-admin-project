import React, { Component } from 'react';
import styles from './style.module.css';
import FormsSection from '../../../pageWidgets/FormsSection';
import SectionTitle from '../../../pageWidgets/SectionTitle';
import StyledRadioButtons from '../../../pageWidgets/StyledRadioButtons';
import { changeCard } from '../../../../assets/icons/common/icons';
import IconButton from '../../../pageWidgets/Buttons/Icon';
import BlueButton from '../../../pageWidgets/Buttons/Blue';
import SmallGreenButton from '../../../pageWidgets/Buttons/SmallGreen';
import SmallRedButton from '../../../pageWidgets/Buttons/SmallRed';

class CostOverview extends Component {
  calculateOverview = (Price, Percentage, totalUnits) => {
      let maxCost = Price * totalUnits * (Percentage / 100);
      let almondFee = Price * totalUnits * (2 / 100);
      return {
          totalUnits: totalUnits,
          percentage: Percentage,
          maxCost: Price * totalUnits * (Percentage / 100),
          almondFee: Price * totalUnits * (2 / 100),
          totalCost: maxCost + almondFee
      };
  };
  render() {
      let overview = 0;
      if (
          this.props.incentive.percentage &&
      this.props.formData.itemsCount &&
      this.props.selectedProduct.retailPrice
      ) {
          let Price =
        this.props.selectedProduct.retailPrice.amount /
        this.props.selectedProduct.retailPrice.divider;
          let Percentage = this.props.incentive.percentage;
          let itemsCount = this.props.formData.itemsCount;
          overview = this.calculateOverview(Price, Percentage, itemsCount);
      }

      return (
          <FormsSection>
              <div className={styles.titleButtonContainer}>
                  <SectionTitle title={'COST OVERVIEW'} />
                  <div
                      className={styles.saveBtnContainer}
                      style={{ pointerEvents: this.props.disabled ? 'none' : '' }}
                  >
                      <SmallGreenButton
                          onClick={() => this.props.submitBatch()}
                          title={'SAVE'}
                      />
                      <SmallRedButton
                          onClick={() => this.props.deleteBatch(this.props.id)}
                          title={'DELETE'}
                      />
                  </div>
              </div>
              <div className={styles.contentContainer}>
                  <div className={styles.boxWithShadow}>
                      <div className={styles.column}>
                          <h2>BREAKDOWN</h2>
                          <p>
                              {overview.totalUnits ? overview.totalUnits : 0}{' '}
                              {this.props.selectedProduct.displayName} units tokenised
                          </p>
                          <p>
                Rewards at {overview.percentage ? overview.percentage : 0}% of
                wholesale value
                          </p>
                          <p>Total estimated cost</p>
                      </div>
                      <div className={styles.columnBorder}>
                          <div className={styles.innerColumnBorder}>
                              <h2>COST</h2>
                              <p>
                                  {this.props.selectedProduct.retailPrice
                                      ? this.props.selectedProduct.retailPrice.currencySymbol
                                      : ''}
                                  {overview.almondFee ? overview.almondFee.toFixed(2) : 0} -
                  Almond fee
                              </p>
                              <p>
                                  {this.props.selectedProduct.retailPrice
                                      ? this.props.selectedProduct.retailPrice.currencySymbol
                                      : ''}
                                  {overview.maxCost ? overview.maxCost.toFixed(2) : 0} - Max
                  spend
                              </p>
                              <p className={styles.blueParagraph}>
                                  {this.props.selectedProduct.retailPrice
                                      ? this.props.selectedProduct.retailPrice.currencySymbol
                                      : ''}
                                  {overview.almondFee ? overview.almondFee.toFixed(2) : 0} to{' '}
                                  {this.props.selectedProduct.retailPrice
                                      ? this.props.selectedProduct.retailPrice.currencySymbol
                                      : ''}
                                  {overview.totalCost ? overview.totalCost.toFixed(2) : 0}
                              </p>
                          </div>
                      </div>
                  </div>
                  <div className={styles.overviewContent}>
                      <div className={styles.overviewWrapper}>
                          <p>
                              <strong>You are now ready to go</strong>
                          </p>
                          <p>
                From the{' '}
                              {this.props.selectedProduct.retailPrice
                                  ? this.props.selectedProduct.retailPrice.currencySymbol
                                  : ''}
                              {overview.totalCost ? overview.totalCost.toFixed(2) : 0} billed
                to your card,{' '}
                              {this.props.selectedProduct.retailPrice
                                  ? this.props.selectedProduct.retailPrice.currencySymbol
                                  : ''}
                              {overview.almondFee ? overview.almondFee.toFixed(2) : 0} will be
                payed now and{' '}
                              {this.props.selectedProduct.retailPrice
                                  ? this.props.selectedProduct.retailPrice.currencySymbol
                                  : ''}
                              {overview.maxCost ? overview.maxCost.toFixed(2) : 0} will be
                held for the rewards. The amount that is not claimed after the
                product expiration date will be returned to your wallet in
                Almond Coins.
                          </p>
                          <BlueButton disabled={this.props.disabled} title="MAKE PAYMENT" />
                          <div className={styles.columnContainer}>
                              <div className={styles.column}>
                                  <StyledRadioButtons
                                      disabled={this.props.disabled}
                                      onChange={val => {
                                          this.props.onFieldChange('paymentType', val.target.value);
                                      }}
                                      options={[
                                          { value: '1', title: 'Card ####1087' },
                                          { value: '2', title: 'Crypto Wallet' }
                                      ]}
                                      value={this.props.formData.paymentType}
                                      defaultValue={'1'}
                                  />
                              </div>
                              <div className={styles.column}>
                                  <span
                                      style={{
                                          pointerEvents: this.props.disabled ? 'none' : '',
                                          opacity: this.props.disabled ? '0.5' : ''
                                      }}
                                  >
                                      <IconButton
                                          titleColor={'#2d8aca'}
                                          icon={changeCard}
                                          title={'change'}
                                      />
                                  </span>
                                  <span
                                      style={{
                                          pointerEvents: this.props.disabled ? 'none' : '',
                                          opacity: this.props.disabled ? '0.5' : ''
                                      }}
                                  >
                                      <IconButton
                                          titleColor={'#2d8aca'}
                                          icon={changeCard}
                                          title={'change'}
                                      />
                                  </span>
                              </div>
                          </div>
                          <span className={styles.balanceOverview}>
                Ballance 1,023,009 ALMND/£1,024
                          </span>
                      </div>
                  </div>
              </div>
          </FormsSection>
      );
  }
}

export default CostOverview;
