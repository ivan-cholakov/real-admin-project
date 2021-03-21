import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.css';
import OnboardingCard from '../../components/pageWidgets/Cards/OnboardingCard';
import ProductIcon from '../../assets/icons/onboarding/product.svg';
import BrandIcon from '../../assets/icons/onboarding/brand.svg';
import InviteIcon from '../../assets/icons/onboarding/method-draw-image.svg';
import WalletIcon from '../../assets/icons/onboarding/wallet.svg';

const cardData = [
    {
        icon: BrandIcon,
        title: 'Add a Brand',
        description: 'Create a page to describe your brand',
        navigateTo: '/assets/brand'
    },
    {
        icon: ProductIcon,
        title: 'Add your Products',
        description: 'Create Product Page, Trial, Stocklists & eCom Files',
        navigateTo: '/assets/product'
    },
    {
        icon: InviteIcon,
        title: 'Invite Colleagues',
        description: 'You can invite your team using various access levels',
        navigateTo: '/admin/users'
    },
    {
        icon: WalletIcon,
        title: 'Top Up Wallet',
        description: 'Add a payment method or top up your account',
        navigateTo: '/admin/wallet'
    }
];

class Dashboard extends Component {

    render() {
        return (
            <div>
                <div className={styles.welcomeHeader}>
                    <div className={styles.butterflyHolder}>
                        <div className={styles.butterfly}>
                            <div className={styles.wing}>
                                <div className={styles.bit}></div>
                                <div className={styles.bit}>></div>
                            </div>
                            <div className={styles.wing}>
                                <div className={styles.bit}></div>
                                <div className={styles.bit}>></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.triangles}>
                        <div className={styles.triangleleft}></div>
                        <div className={styles.triangleright}></div>
                    </div>
                    <div className={styles.bounceHolder}>
                        <div className={styles.bounceInsideBottom}>
                            <div className={styles.bounce}></div>
                        </div>
                        <div className={styles.bounceInsideUp}>
                            <div className={styles.bounce}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.titleContainer}>
                    <h1> Welcome to the Almond Brand Management System (BMS).<br />You are now ready to get started!</h1>
                </div>
                <div className={styles.cardRow} >
                    {cardData.map((card, i) => (
                        <OnboardingCard {...card} key={i} />
                    ))}
                </div>

                <div className={styles.dashboardLink}>
                    <Link to="/dashboard-2">Go to Dashboard</Link>
                </div>

            </div>
        );
    }
}

export default Dashboard;
