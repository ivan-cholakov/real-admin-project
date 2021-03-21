import React from 'react';
import styles from './style.module.css';
import test1 from '../../../assets/img/almond-batch@2x.png';
import test2 from '../../../assets/img/transperency-batch@2x.png';
import test3 from '../../../assets/img/UK-batch@2x.png';

const icon = (data) => {
    switch (data) {
    case 'test1':
        return test1;
    case 'test2':
        return test2;
    case 'test3':
        return test3;
    default:
        return
    }
};

function CertificationBadge(props) {

    return <img className={styles.icon} src={icon(props.icon)} alt=""/>
}

export default CertificationBadge
