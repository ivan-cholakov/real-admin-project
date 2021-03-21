import React from 'react';
import StatusComponent from '../../../pageWidgets/StatusComponent';

function ActivityRow(props) {
    return <div>
        <span>{props.email}</span>
        <span>{props.firstName}</span>
        <span>{props.lastName}</span>
        <span><StatusComponent active={props.active} /></span>
    </div>
}

export default ActivityRow
