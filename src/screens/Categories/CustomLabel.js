import React from 'react';

import { Config } from '../../core/config';
import { client } from '../../core/client';

// import { editIcon, deleteIcon } from '../../assets/icons/common/icons';

const config = new Config();

const CustomLabel = ({ name, icon, id, onEdit, onDel }) => {
    const baseUrl = `${config.getBaseUrl()}/storage`;
    const token = client.auth.getSessionToken();

    return (
        <span className="cus-label">
            <img
                src={
                    icon &&
          `${baseUrl}${icon}?token=${token}&width=20&height=20&quality=80`
                }
            />
      &nbsp; &nbsp;
            <span>{name}</span>
      &nbsp; &nbsp;
            <span style={{ color: 'blue' }} onClick={onEdit(id)}>
        Edit
            </span>
      &nbsp; &nbsp;
            <span style={{ color: '#EB0000' }} onClick={onDel(id)}>
        Delete
            </span>
        </span>
    );
};

export default CustomLabel;
