import React, { Component } from 'react';
import { Tabs } from 'antd';
import styles from './style.module.css';
import About from './Tabs/About/containers';
import StockistFile from '../../../pageWidgets/Files/Stockist/containers';
import TrailFile from './Tabs/TrailFile/index';
import Ecom from '../../../pageWidgets/Files/Ecom/containers';
import { withRouter } from 'react-router-dom';

const TabPane = Tabs.TabPane;
class NewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: '1',
            formData: {
                
            }
        };
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.tabs = [
            { name: 'ABOUT', key: '1', component: About, route: '/assets/product/about' },
            { name: 'CONTENTS', key: '2', component: TrailFile, route: '/assets/product/contents', disabled: true },
            { name: 'STOCKISTS', key: '3', component: StockistFile, route: '/assets/product/stockists', disabled: true },
            { name: 'eCOM', key: '4', component: Ecom, route: '/assets/product/ecom', disabled: true },
        ]
    }

    componentDidMount() {
        this.handleLocationChange();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.handleLocationChange();
        }
    }
    onFieldChange = (value, name) => {
        this.setState( Object.assign( this.state.formData, {[name]: value}));
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
        const tabs = this.tabs.map((x, i) => {
            return (
                <TabPane disabled={x.disabled} tab={x.name} key={(i + 1).toString()}><x.component route={x.route} /></TabPane>
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

export default withRouter(NewProduct);
