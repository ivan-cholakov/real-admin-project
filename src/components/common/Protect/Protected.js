import React from 'react';

const Protected = ({
    permissions = [],
    rule = () => {},
    children,
}) => {
    const hasAccess = rule(permissions.map(p => p.name));
    if (hasAccess) {
        return <React.Fragment>{children}</React.Fragment>;
    }
    return null;
}

export default Protected;
