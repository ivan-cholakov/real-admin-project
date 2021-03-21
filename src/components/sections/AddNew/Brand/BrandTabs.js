import React, { Component } from 'react';
import { Tabs } from 'antd';
import styles from './style.module.css';
import NewBrand from './containers/edit';
import StockistFile from '../../../pageWidgets/Files/Stockist/containers';
import { withRouter } from 'react-router-dom';
import Ecom from '../../../pageWidgets/Files/Ecom/containers';


const TabPane = Tabs.TabPane;
class BrandTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: '1',
            formData: {

            }
        };
        const { match: { params: { id } } } = this.props;
        this.brandId = id;
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.tabs = [
            { name: 'ABOUT', key: '1', component: NewBrand, route: `/assets/brands/${id}/about` },
            { name: 'STOCKISTS', key: '2', component: StockistFile, route: `/assets/brands/${id}/stockists` },
            { name: 'eCOM', key: '3', component: Ecom, route: `/assets/brands/${id}/ecom?type=brand` },
        ]
    }

    componentDidMount() {
        this.handleLocationChange();
        this.props.getBrand(this.brandId);
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

export default withRouter(BrandTabs);
