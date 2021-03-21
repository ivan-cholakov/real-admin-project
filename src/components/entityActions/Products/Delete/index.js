import React, { Component } from 'react';
import styles from './style.module.css';
import ViewProduct from '../../../components/ViewProduct';
class DeleteProduct extends Component {
    render() {
        return (
            <div className={styles.componentWrapper}>
                <ViewProduct sessionId = {this.props.userProfile.session.id} productsData = {this.props.productsData} />
                <div className={styles.deleteCompanyBtn} onClick={() => {this.props.deleteProduct(this.props.productsData.id)}}>
                    Delete Product
                </div>
            </div>
        )
    }
}

export default DeleteProduct
