import React, { Component } from 'react';
import styles from './style.module.css';
import SectionTitle from '../../../pageWidgets/SectionTitle';
import Overview from './Overview';
import AddPayment from './AddPayment';
import Transactions from './Transactions';

class Wallet extends Component {
    constructor(props){
        super(props);
        this.state = {currentView: 0};
        this.changeActiveComponent = this.changeActiveComponent.bind(this);
        this.availableComponents = [
            <Overview changeActiveComponent={this.changeActiveComponent} key={0}/>,
            <AddPayment changeActiveComponent={this.changeActiveComponent} key={1}/>,
            <Transactions key={2}/>
        ]
    }
    changeActiveComponent(currentView) {
        this.setState({currentView});
    }

    render() {
        const currentComponent = this.availableComponents[this.state.currentView];
        return (
            <div className={styles.screenWrapper}>
                <div className={styles.content}>
                    <div className={styles.titleContainer}>
                        <SectionTitle title={'Account Credit'} />
                    </div>
                    <div className={styles.innerContent}>
                        {currentComponent}
                    </div>
                </div>
            </div>
        );
    }
}

export default Wallet;

