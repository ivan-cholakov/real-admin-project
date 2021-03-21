import React, { Component } from 'react';
import styles from './style.module.css';
import { Button } from 'antd';
import TableWithLoader from './containers/Table';

class BrandsList extends Component {
    componentDidMount() {
        this.props.getBrands();
    }

    render() {
        const dataSource = this.props.brandsData.map((x, i) => {
            return {
                ...x,
                key: i
            }
        });

        return (
            <div className={styles.screenWrapper}>
                <Button className={styles.addCompanyBtn} onClick={() => this.props.openDrawer({title: 'Create a brand',action: 'create', type: 'brand'})}>
                    Add Brand
                </Button>
                <TableWithLoader dataSource={dataSource}/>
            </div>
        )

    }
}



export default BrandsList
