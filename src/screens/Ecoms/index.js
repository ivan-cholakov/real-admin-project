import React, { Component } from 'react';
import styles from './style.module.css';
import { Button } from 'antd';
import TableWithLoader from './containers/Table';

class EcomsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const dataSource = this.props.ecomsData.data.map((x, i) => {
            return {
                ...x,
                key: i
            }
        });
        return (
            <div className={styles.screenWrapper}>
                <Button className={styles.addEcomBtn} onClick={() => this.props.openDrawer({title: 'Create a ecom',action: 'create',type: 'ecom'})}>
                    Add Ecom
                </Button>

                <TableWithLoader dataSource={dataSource} />
            </div>
        )
    }
}



export default EcomsList
