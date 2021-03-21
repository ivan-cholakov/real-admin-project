import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { message } from 'antd';
import { clearNotification, triggerNotification } from './actions';
import { client } from '../../../core/client';

class Notification extends Component {
    constructor(props) {
        super(props);
        // this.responseListener = this.responseListener.bind(this);
        this.errorListener = this.errorListener.bind(this);
    }
    componentDidMount() {
        client.client.on('error', this.errorListener);
    }
    componentWillUnmount() {
        client.client.removeListener('error', this.errorListener);
    }
    errorListener(err) {
        this.props.triggerNotification({msg: err.message, type:'error', duration:5})
    }
    componentDidUpdate() {
        const {msg, type, duration} = this.props.notification;
        if (typeof(msg)==='object') {
            flatObject(msg).forEach(value => {
                message[type](value, duration);
            });
        } else { 
            message[type](msg,duration);
        }
    }
    render() {
        return (
            <React.Fragment></React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notification: state.Notification.notification
    }
}
const mapDispatchToProps = (dispatch) => ({
    clearNotification: () => {
        dispatch(clearNotification());
    },
    triggerNotification: (notification) => {
        dispatch(triggerNotification(notification));
    }
});

const flatObject = (obj) =>{
    let result = [];
    for (var key in obj) {
        if (typeof obj[key] === 'object') {
            result = _.concat(result,flatObject(obj[key]));   
        } else {
            result.push(obj[key])
        }
    }
    return result;
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
