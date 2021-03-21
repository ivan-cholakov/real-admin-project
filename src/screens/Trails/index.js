import React, { Component } from 'react';
import styles from './style.module.css';
import { Button } from 'antd';
import TableWithLoader from './containers/Table';

class TrailsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const dataSource = this.props.trailsData.data.map((x, i) => {
            return {
                ...x,
                key: i
            }
        });
        return (
            <div className={styles.screenWrapper}>
                <Button className={styles.addTrailBtn} onClick={() => this.props.openDrawer({title: 'Create a trail',action: 'create',type: 'trail'})}>
                    Add Trail
                </Button>

                <TableWithLoader dataSource={dataSource} />
            </div>
        )
    }
}



export default TrailsList
