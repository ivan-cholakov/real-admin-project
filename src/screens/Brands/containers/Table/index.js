import { connect } from 'react-redux';
import React from 'react';
import TableWithLoader from '../../../../components/pageWidgets/TableWithLoader';
import { Dropdown, Menu, Icon } from 'antd';
import { openDrawer } from '../../../../components/common/drawer/container/actions';
import { getBrand} from '../screen/actions';
import { store } from '../../../../store';


// Name
// - Owner
// - Creation date
// - Last Modified date
// [{
//     title: 'Name',
//     // dataIndex: 'name',
//     sorter: true,
//     fixed:'left',
//     key:'name',
//     width:200,
//     render: (record) => (
//         <a onClick={() => {store.dispatch(getCompany(record.id)); store.dispatch(openDrawer({visible: true, action: 'Read', title: 'View Company'})); }}>
//             {record.name}
//         </a>
//     )
//   }, {
//     title: 'Creation Date',
//     dataIndex: 'createdAt',
//     key: 'createdAt',
//     render: timestamp => `${new Date(timestamp).toLocaleDateString()}`,
//   }, {
//     title: 'Last Modified Date',
//     key: 'lastUpdated',
//     dataIndex: 'lastUpdated',
//     render: timestamp => `${new Date(timestamp).toLocaleDateString()}`
//   }, {
//     title: '',
//     key: 'actions',
//     dataIndex: 'id',
//     render: companyId => (
//         <StyledDropdown overlay={menu({companyId})} trigger={['click']}>
//             <a className="ant-dropdown-link" href="#">
//             Actions<Icon type="down" />
//             </a>
//         </StyledDropdown>
//     ),
//     width: 150,
//     fixed:'right'
//   }];

const menu = (props) => (
    <Menu>
        <Menu.Item key="0">
            <span onClick={() => {
                store.dispatch(getBrand(props.brandId));
                store.dispatch(openDrawer({ action: 'update', title: 'Edit Brand', type: 'brand' })); 
            }}>Edit</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
            <span onClick={() => {
                store.dispatch(getBrand(props.brandId));
                store.dispatch(openDrawer({ action: 'Delete', title: 'Delete Brand', type: 'delete' })); 
            }}>Delete</span>
        </Menu.Item>
    </Menu>
);

const columns =
    [{
        title: 'Name',
        // dataIndex: 'name',
        sorter: true,
        fixed: 'left',
        key: 'name',
        width: 200,
        render: (record) => (
            <span onClick={() => { 
                store.dispatch(getBrand(record.id));
                store.dispatch(openDrawer({ visible: true, action: 'Read', title: 'View Company' })); 
            }}>
                {record.name}
            </span>
        )
    }, {
        title: 'Creation Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: timestamp => `${new Date(timestamp).toLocaleDateString()}`,
    }, {
        title: 'Last Modified Date',
        key: 'lastUpdated',
        dataIndex: 'lastUpdated',
        render: timestamp => `${new Date(timestamp).toLocaleDateString()}`
    }, {
        title: '',
        key: 'actions',
        dataIndex: 'id',
        render: brandId => (
            <Dropdown overlay={menu({ brandId })} trigger={['click']}>
                <span className="ant-dropdown-link" href="#">
                    Actions<Icon type="down" />
                </span>
            </Dropdown>
        ),
        fixed: 'right',
        width:200
    }];

const mapStateToProps = (state) => ({
    loading: state.Brands.loading,
    columns: columns,
    scroll: { x: 800}
});

export default connect(mapStateToProps, null)(TableWithLoader);
