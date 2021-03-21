import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './style.module.css';
import { batch, stokist, campaign, trail, ecommerce, product, brand, user, productPage} from '../../../../assets/icons/sideNavigation/addAssets/icons';
import AddButton from '../../../pageWidgets/Buttons/Add';
class AddNewOverlay extends Component {
    constructor(props) {
        super(props);
        this.marketingMenuItems = [
            { icon: batch, title: 'Batch', route: '/batch' },
            { icon: campaign, title: 'Campaign', route: '' },
        ]
        this.fileMenuItems = [
            { icon: stokist, title: 'Stokist File', route: '' },
            { icon: trail, title: 'Trail File', route: '' },
            { icon: ecommerce, title: 'E-com File', route: '' },
        ]
        this.entityMenuItems = [
            { icon: product, title: 'New Product', route: '/assets/product' },
            { icon: productPage, title: 'New Product Page', route: '' },
            { icon: brand, title: 'New Brand', route: '/assets/brand' },
            { icon: user, title: 'New User', route: '' },
        ]
    }
    handleMenuClick = (route) => {
        this.props.hideOverlay();
        this.props.history.push(route);
    }
    render() {
        const marketingIcons = this.marketingMenuItems.map((x, i) => {
            return (
                <AddButton {...x} key={i} onClick={() => { this.handleMenuClick(x.route) }} />
            )
        });
        const fileMenuItems = this.fileMenuItems.map((x, i) => {
            return (
                <AddButton {...x} key={i} onClick={() => { this.handleMenuClick(x.route) }} />
            )
        });
        const entityMenuItems = this.entityMenuItems.map((x,i) => {
            return (
                <AddButton {...x} key={i} onClick={() => { this.handleMenuClick(x.route) }} />
            )
        })
        return (
            <div className={styles.addNewContainer}>
                <div className={styles.iconsContainer}>
                    <div className={styles.iconSeparator}>
                        {marketingIcons}
                    </div>
                    <div className={styles.iconSeparator}>
                        {fileMenuItems}
                    </div>
                    <div className={styles.iconSeparator}>
                        {entityMenuItems}
                    </div>

                </div>
            </div>
        );
    }
}

export default withRouter(AddNewOverlay);
