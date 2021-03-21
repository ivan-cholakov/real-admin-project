import React, { Component } from 'react';
import styles from './style.module.css';
import FormsSection from '../../../../pageWidgets/FormsSection';
import SectionTitle from '../../../../pageWidgets/SectionTitle';
import Bubble from '../../../../pageWidgets/Bubble';
import TextInput from '../../../../pageWidgets/TextInput';

class ProductReward extends Component {
    render() {
        this.bubbles = [
            { 
                fill: 'darkGreen', 
                bigTxt:  this.props.rewards.fiat ? 
                    this.props.rewards.fiatCurrencySymbol + this.props.rewards.fiat.toFixed(2) : 
                    this.props.rewards.fiatCurrencySymbol+'0', 
                smallTxt: 'Reward Value' 
            },
            { fill: 'brown',
                bigTxt: this.props.rewards.coins ?
                    Math.round(this.props.rewards.coins) :
                    '0',
                smallTxt: 'Almond Coins'
            }
        ];
        const bubbles = this.bubbles.map((x, i) => {
            return (
                <Bubble {...x} key={i} />
            )
        })
        return (
            <FormsSection backgroundStyle={'grey'}>
                <div className={styles.rewardsContainer}>
                    
                    <div className={styles.leftPart}>
                        <SectionTitle title="Reward Value" />
                        <div className={styles.inputContainer}>
                            <div>
                                <TextInput
                                    disabled={this.props.disabled}
                                    label={'Retail Price'}
                                    onChange={this.props.onPriceChange}
                                    value={this.props.price}
                                    defaultValue={0}
                                    type={'number'}
                                    placeholder={'00.00'}
                                />
                            </div>
                            <div>
                                <TextInput
                                    disabled={this.props.disabled}
                                    label={'Set Percentage'}
                                    onChange={this.props.onPercentChange}
                                    value={this.props.percentage}
                                    type={'number'}
                                />
                            </div>
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

export default ProductReward;
