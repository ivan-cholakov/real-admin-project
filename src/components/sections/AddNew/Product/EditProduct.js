import React, { Component } from 'react';
import { Tabs } from 'antd';
import styles from './style.module.css';
import About from './Tabs/About/containers/edit';
import StockistFile from '../../../pageWidgets/Files/Stockist/containers';
import TrailFile from './Tabs/TrailFile/';
import { withRouter } from 'react-router-dom';
import Ecom from '../../../pageWidgets/Files/Ecom/containers';


const TabPane = Tabs.TabPane;
class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: '1',
            formData: {

            }
        };
        const { match: { params: { id } } } = this.props;
        this.productId = id;
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.tabs = [
            { name: 'ABOUT', key: '1', component: About, route: `/assets/products/${id}/about` },
            { name: 'CONTENTS', key: '2', component: TrailFile, route: `/assets/products/${id}/contents` },
            { name: 'STOCKISTS', key: '3', component: StockistFile, route: `/assets/products/${id}/stockists` },
            { name: 'eCOM', key: '4', component: Ecom, route: `/assets/products/${id}/ecom?type=product` },
        ]
    }

    componentDidMount() {
        this.handleLocationChange();
        this.props.getProduct(this.productId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.handleLocationChange();
        }
    }
    onFieldChange = (value, name) => {
        this.setState(Object.assign(this.state.formData, { [name]: value }));
    };

    handleTabChange(key) {
        this.setState({ tabIndex: key });
        const match = this.tabs.find((x) => {
            return x.key === key
        });

        if (match) {
            this.props.history.push(match.route);
            // this.props.changeAdminActive(+key-1);
        }
    }

    handleLocationChange() {
        const currentLocation = this.props.location.pathname;
        const match = this.tabs.find((x) => {
            return x.route === currentLocation;
        });

        if (match) {
            this.setState({ tabIndex: match.key });
        }
    }

    render() {
        const tabs = this.tabs.map((x) => {
            return (
                <TabPane tab={x.name} key={x.key}><x.component route={x.route} /></TabPane>
            )
        });

        return (
            <div className={styles.AdminWrapper}>
                <Tabs onChange={this.handleTabChange} activeKey={this.state.tabIndex} size={'large'}>
                    {tabs}
                </Tabs>
            </div>
        );
    }
}

export default withRouter(EditProduct);
