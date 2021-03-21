import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
class LandingPage extends Component {
    constructor(props){
        super(props);
        //only redirects to dashboard for now. maybe we'll have something of value for landing page.
        this.props.history.push('/');
    }
    render() {
        return (
            <div></div>
        );
    }
}

export default withRouter(LandingPage)
