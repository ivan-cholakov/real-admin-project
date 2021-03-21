import React, { Component } from 'react';
import styles from './style.module.css';
import Profile from '../../pageWidgets/Profile';
import logo from '../../../assets/img/Almond_Logo.png'
import MenuIcon from './MenuIcon';

class Header extends Component {
    constructor(props) {
        super(props);
        this.menuIconRef = React.createRef();
        this.middleHeaderRef = React.createRef();
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }


    componentDidUpdate(prevProps) {
        if (prevProps.collapsed !== this.props.collapsed) {
            const screenWrapper = document.getElementById('screenWrapper');
            this.menuIconRef.current.classList.toggle(styles.expanded);
            if (this.props.collapsed) {
                if (this.props.isMobile) {
                    screenWrapper.classList.remove('expandedWrapper');
                }
                this.middleHeaderRef.current.className = styles.middleHeader;
            }
            else {
                if (this.props.isMobile) {
                    screenWrapper.classList.add('expandedWrapper');
                }
                this.middleHeaderRef.current.classList.add(styles.expandedHeader);
            }
        }
    }
    handleMenuClick() {
        if(this.props.collapsed){
            this.props.expandMenu();
        }
        else{
            this.props.collapseMenu();
        }
    }
    render() {
        return (
            <div className={styles.headerWrapper + ' header'}>
                <div className={styles.menuIconContainer} ref={this.menuIconRef}>

                    <div className={styles.backgroundDiv}>
                    </div>

                    <MenuIcon onClick={this.handleMenuClick} />
                </div>
                <div className={styles.middleHeader} ref={this.middleHeaderRef}>

                    <div className={styles.leftPart}>
                        <div className={styles.leftPartWrapper}>

                            <span className={styles.logoContainer}>
                                <img src={logo} alt="" />
                            </span>
                            <div className={styles.companyLabel} onClick={() => {
                                this.props.getCompany(this.props.selectedCompany)
                                    .then(() =>{
                                        this.props.openDrawer({
                                            action: 'read',
                                            title: 'Read Company',
                                            type: 'company',
                                            className: 'userDrawer'
                                        })})

                            }}>
                                {this.props.company.displayName}
                            </div>
                        </div>
                    </div>
                    <div className={styles.captionContainer}>
                        {this.props.title}
                    </div>
                    <div className={styles.profileContainer}>
                        <Profile
                            getRoles={this.props.getRoles}
                            user={this.props.user}
                            changeTitle={this.props.changeTitle}
                            changeNavActive={this.props.changeNavActive}
                            signOut={this.props.signOut}
                        />
                    </div>
                </div>
            </div>

        );
    }
}

export default Header
