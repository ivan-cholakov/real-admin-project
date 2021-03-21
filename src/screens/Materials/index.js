import React, { Component } from 'react';
import styles from './style.module.css';
import { Button } from 'antd';
import MaterialCRUD from './CRUD/containers/screen';
import TableWithLoader from './Page/containers/Table';

class MaterialsList extends Component {
    constructor(props) {
        super(props);
        this.handleTriggerDrawer = this.handleTriggerDrawer.bind(this);
    }

    handleTriggerDrawer(title, component) {
        this.props.triggerDrawer({ visible: true, title: title, action: component })
    }

    render() {
        const dataSource = this.props.materialsData.map((x, i) => {
            return {
                ...x,
                key: i
            }
        });

        return (
            <div className={styles.screenWrapper}>
                <MaterialCRUD/>
                <Button className={styles.addCompanyBtn}
                    onClick={() => this.handleTriggerDrawer('Create a material', 'Create')}>
                        Add Material
                </Button>
                <TableWithLoader dataSource={dataSource}/>
            </div>
        )
    }
}



export default MaterialsList
