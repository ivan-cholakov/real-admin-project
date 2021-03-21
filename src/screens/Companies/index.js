import React, { Component } from 'react';
import styles from './style.module.css';
import { Button } from 'antd';
import TableWithLoader from './containers/Table';

class CompaniesList extends Component {
    render() {
        const dataSource = this.props.companiesData.data.map((x, i) => {
            return {
                ...x,
                key: i
            }
        });
        return (
            <div className={styles.screenWrapper}>
                <Button className={styles.addCompanyBtn} onClick={() => this.props.openDrawer({title: 'Create a company',action: 'create',type: 'company'})}>
                    Add Company
                </Button>

                <TableWithLoader dataSource={dataSource} />
            </div>
        )
    }
}



export default CompaniesList
