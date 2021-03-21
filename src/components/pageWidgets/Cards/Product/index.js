import React, { Component } from 'react';
import styles from './style.module.css';
import { editIcon, deleteIcon } from '../../../../assets/icons/common/icons';


class ProductCard extends Component {
    render() {
        return (
            <div className={styles.productCard}>
                <div className={styles.productImage} onClick={this.props.onViewClick}>
                    <div className={styles.productImageContainer}>
                        <img src={this.props.product.imgUrl} alt="product" />
                    </div>
                </div>
                <div className={styles.productInfo}>
                    <div className={styles.infoRow}>
                        <div className={styles.label}>
                            Name:
                        </div>
                        <div className={styles.rowData}>
                            {this.props.product.name}
                        </div>
                    </div>
                    <div className={styles.infoRow}>
                        <div className={styles.label}>
                            Brand:
                        </div>
                        <div className={styles.rowData}>
                            {this.props.product.brand}
                        </div>
                    </div>
                    <div className={styles.infoRow}>
                        <div className={styles.label}>
                            SKU Code:
                        </div>
                        <div className={styles.rowData}>
                            {this.props.product.SKUCode}
                        </div>
                    </div>
                </div>
                <div className={styles.productActions} onClick={this.props.onEditClick}>
                    <div className={styles.editIcon}>
                        {editIcon}
                    </div>
                    <div className={styles.deleteIcon} onClick={this.props.onDeleteClick}>
                        {deleteIcon}
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductCard
