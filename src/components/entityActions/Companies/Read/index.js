import React, { Component } from 'react';
import styles from './style.module.css';
import ViewCompany from '../Overview';
class ReadCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {company: {}};
        this.state.company = this.props.companiesData.data.find((x) => {
            return x.id === this.props.selectedCompany;
        })
    }
    componentDidUpdate(prevProps){
        if(this.props.selectedCompany !== prevProps.selectedCompany) {
            const company = this.props.companiesData.data.find((x) => {
                return x.name === this.props.selectedCompany;
            })
            this.setState({company});
        }
    }
    render() {
        return (
            <div className={styles.componentWrapper}>
                {/*<ViewCompany*/}
                    {/*user = {this.props.userProfile}*/}
                    {/*openDrawer={this.props.openDrawer}*/}
                    {/*sessionId = {this.props.userProfile.session.id}*/}
                    {/*companyData = {this.props.companyData}*/}
                    {/*getCompany = {this.props.getCompany}*/}
                {/*/>*/}
            </div>
        )
    }
}



export default ReadCompany
