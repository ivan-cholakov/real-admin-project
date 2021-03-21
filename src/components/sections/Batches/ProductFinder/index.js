import React, { Component } from 'react';
import styles from './style.module.css';
import FormsSection from '../../../pageWidgets/FormsSection';
import SectionTitle from '../../../pageWidgets/SectionTitle';
import StockistPreview from '../../../pageWidgets/Files/Stockist/Preview';
import EcomPreview from '../../../pageWidgets/Files/Ecom/Preview';

class ProductFinder extends Component {
    onEcomChange = (id) => {
        this.props.onFieldChange('ecomId', id);
    }

    render() {
        return (
            <FormsSection backgroundStyle="grey">
                <SectionTitle title={'PRODUCT FINDER'} />
                <div className={styles.contentWrapper}>
                    <div className={styles.half}> 
                        <StockistPreview
                            stockistsData={this.props.stockistsData}
                            disabled={this.props.disabled}
                        />
                    </div>
                    <div className={styles.half}>
                        <EcomPreview
                            onEcomChange={this.onEcomChange}
                            productId={this.props.formData.productId}
                            ecomsData={this.props.ecomsData}
                            disabled={this.props.disabled}
                        />
                    </div>
                </div>
                
            </FormsSection>
        );
    }
}

export default ProductFinder
