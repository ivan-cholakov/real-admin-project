import React, { Component } from 'react';
import styles from './style.module.css';
import { Button } from 'antd';
import ProductCRUD from './CRUD/containers/screen';
import TableWithLoader from './Page/containers/Table';

class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.handleTriggerDrawer = this.handleTriggerDrawer.bind(this);
    }
    componentDidMount() {
        this.props.getProducts();
    }
    handleTriggerDrawer(title, component) {
        this.props.triggerDrawer({ visible: true, title: title, action: component })
    }
    

    render() {
        const dataSource = this.props.productsData.map((x, i) => {
            return {
                ...x,
                key: i
            }
        });

        return (
            <div className={styles.screenWrapper}>
                <ProductCRUD/>
                <Button className={styles.addCompanyBtn}
                    onClick={() => this.handleTriggerDrawer('Create a product', 'Create')}>
                        Add Product
                </Button>
                <TableWithLoader dataSource={dataSource}/>
            </div>
        )
    }
}



export default ProductsList
