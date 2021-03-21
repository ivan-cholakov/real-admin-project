import React, { Component } from 'react';
import styles from './style.module.css';
import FormsSection from '../../../pageWidgets/FormsSection';
import SectionTitle from '../../../pageWidgets/SectionTitle';
import Bubble from '../../../pageWidgets/Bubble';
import AdvancedInput from '../../../pageWidgets/Inputs/AdvancedInput';

class Rewards extends Component {
    onChange = (value) => {
        this.props.onIncentiveChange(+value)
    }

    calculateRewards = (Price, Percentage, totalUnits) => {
        return {
            reward: Price * (Percentage / 100),
            coinReward: Price * (Percentage / 100) * 10,
            maxCost: Price * totalUnits * (Percentage / 100)
        }
    };

    render() {
        let rewards = 0;
        if (this.props.incentive.percentage &&
            this.props.formData.itemsCount &&
            this.props.selectedProduct.retailPrice) {
            let Price = this.props.selectedProduct.retailPrice.amount / this.props.selectedProduct.retailPrice.divider;
            let Percentage = this.props.incentive.percentage;
            let totalUnits = this.props.formData.itemsCount;
            rewards = this.calculateRewards(Price, Percentage, totalUnits);
        }


        this.bubbles = [
            { 
                fill: 'darkGreen', 
                bigTxt: rewards.reward ? 
                    this.props.selectedProduct.retailPrice.currencySymbol + rewards.reward.toFixed(2) : 
                    '0', 
                smallTxt: 'Reward Value' 
            },
            { 
                fill: 'green',
                bigTxt: rewards.coinReward ?
                    rewards.coinReward.toFixed(2) : 
                    '0',
                mediumTxt: ' ALMD',
                smallTxt: 'Reward Value'
            },
            { fill: 'brown',
                bigTxt: rewards.maxCost ?
                    this.props.selectedProduct.retailPrice.currencySymbol + rewards.maxCost.toFixed(2) :
                    '0',
                smallTxt: 'Max Cost' 
            }
        ];
        const bubbles = this.bubbles.map((x, i) => {
            return (
                <Bubble {...x} key={i} />
            )
        })

        return (
            <FormsSection>
                <div className={styles.rewardsContainer}>
                    <div className={styles.leftPart}>
                        <SectionTitle title="Rewards" />
                        <div className={styles.inputContainer}>
                            <div className={styles.notInlineDropdown}>
                                <AdvancedInput
                                    suffix={'%'}
                                    disabled={this.props.disabled}
                                    value={this.props.incentive.percentage}
                                    label={'Set Percentage'}
                                    backgroundStyle={'grey'}
                                    onChange={(value) => { this.onChange(value) }}
                                    inline={false} 
                                />
                            </div>
                            <div className={styles.inlineDropdown}>
                                <AdvancedInput
                                    suffix={'%'}
                                    disabled={this.props.disabled}
                                    value={this.props.incentive.percentage}
                                    label={'Set Percentage'}
                                    backgroundStyle={'grey'}
                                    onChange={(value) => { this.onChange(value) }}
                                    inline={true} 
                                />
                            </div>
                            {this.props.selectedProduct.retailPrice && 
                                <div style={{
                                    opacity: (this.props.disabled) ? '0.5' : '', width: '31%', marginLeft: '-15px', fontSize: '13px', color: 'rgb(87,87,86)', top: '0', lineHeight: '1.5'}}
                                className={styles.description}> of {this.props.selectedProduct.retailPrice.currencySymbol}{(this.props.selectedProduct.retailPrice.amount / this.props.selectedProduct.retailPrice.divider)} retail value </div>
                            }
                            
                        </div>
                    </div>
                    <div className={styles.rightPart}>
                        <div className={styles.bubblesContainer} style={{
                            opacity: (this.props.disabled) ? '0.5' : ''}}>
                            {bubbles}
                        </div>
                    </div>
                </div>
            </FormsSection>
        );
    }
}

export default Rewards;
