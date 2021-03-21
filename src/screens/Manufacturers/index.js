import React, { Component } from 'react';
import styles from './style.module.css';
import { Button } from 'antd';
import ManufacturerCRUD from './CRUD/containers/screen';
import TableWithLoader from './Page/containers/Table';

class ManufacturersList extends Component {
    constructor(props) {
        super(props);
        this.handleTriggerDrawer = this.handleTriggerDrawer.bind(this);
    }
    handleTriggerDrawer(title, component) {
        this.props.triggerDrawer({ visible: true, title: title, action: component })
    }

    render() {
        const dataSource = this.props.manufacturersData.map((x, i) => {
            return {
                ...x,
                key: i
            }
        });

        return (
            <div className={styles.screenWrapper}>
                <ManufacturerCRUD/>
                <Button className={styles.addCompanyBtn}
                    onClick={() => this.handleTriggerDrawer('Create a manufacturer', 'Create')}>
                        Add Manufacturer
                </Button>
                <TableWithLoader dataSource={dataSource}/>
            </div>
        )
    }
}



export default ManufacturersList
