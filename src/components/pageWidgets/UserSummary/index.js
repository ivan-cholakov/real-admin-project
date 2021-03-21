import React, {Component} from 'react';
import styles from './style.module.css';
import TableWithLoader from '../../../screens/Users/containers/Table';

class UserSummary extends Component {

    onTableChange = () => {
    };

    render() {
        return (
            <div className={styles.userWrapper}>
                <TableWithLoader onTableChange={this.onTableChange}/>
            </div>

        );

    }
}

export default UserSummary
