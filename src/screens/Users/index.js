import React, { Component } from 'react';
import styles from './style.module.css';
import { Button } from 'antd';
import UserCRUD from './containers/screen';
import TableWithLoader from './containers/Table';

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.handleTriggerDrawer = this.handleTriggerDrawer.bind(this);
    }
    componentDidMount() {
        this.props.getUsers();
    }
    handleTriggerDrawer(title, component) {
        this.props.triggerDrawer({ visible: true, title: title, action: component })
    }

    render() {
        const dataSource = this.props.usersData.map((x, i) => {
            return {
                ...x,
                key: i
            }
        });

        return (
            <div className={styles.screenWrapper}>
                <UserCRUD/>
                <Button className={styles.addCompanyBtn}
                    onClick={() => this.handleTriggerDrawer('Create a user', 'Create')}>
                        Add User
                </Button>
                <TableWithLoader dataSource={dataSource}/>
            </div>
        )
    }
}



export default UsersList
