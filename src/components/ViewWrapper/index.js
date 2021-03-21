import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import styles from './style.module.css';
import './antdCustom.css';
import SideNavigation from './containers/SideNavigation';
import Header from './containers/Header';
import ChangePassword from '../../screens/Auth/ChangePassword/containers/screen';
import EditProfile from '../../screens/EditProfile/containers/screen';
import { Loader } from '../common/Loader';
import Dashboard2 from '../../screens/Dashboard2/containers/screen';
import Batches from '../../screens/Batches/containers/screen/index';
import EditBatch from '../../screens/Batches/containers/screen/edit';
import Analytics from '../../screens/Analytics';
import Marketing from '../../screens/Marketing';
import CompanyInfo from '../../screens/CompanyInfo';
import Billing from '../../screens/Billing';
import Contact from '../../screens/Contact';
import FAQ from '../../screens/FAQ';
import DrawerComponent from '../common/drawer/container/index';
import Footer from '../layout/Footer';
import Dashboard from '../../screens/Dashboard';
import Admin from '../../screens/Admin/containers/screen';
import NewBrand from '../sections/AddNew/Brand/containers';
import BrandTabs from '../sections/AddNew/Brand/containers/BrandTabs';
import NewProduct from '../sections/AddNew/Product/containers';
import EditProduct from '../sections/AddNew/Product/containers/edit';
import ProductList from '../../screens/ProductList/container';
import BatchesList from '../../screens/BatchesList/container';
import BrandsList from '../../screens/BrandList/container';

import {
    // plus,
    batches,
    marketing,
    analytics,
    assets,
    admin,
    dashboard
} from '../../assets/icons/sideNavigation/icons';
class ViewWrapper extends Component {
    constructor(props) {
        super(props);
        this.isMobile = false;
        this.contentContainerRef = React.createRef();
        this.props.getCompanies();
        this.handleResize = this.handleResize.bind(this);
    }

  menuItemsMap = [
      {
          id: 'dashboard',
          title: 'Dashboard',
          itemlabel: 'Dashboard',
          navigationUrl: '/',
          icon: dashboard
      },
      {
          id: 'batches',
          title: 'Batches',
          itemlabel: 'Batches',
          navigationUrl: '/batches',
          icon: batches
      },

      {
          id: 'marketing',
          title: 'Marketing',
          itemlabel: 'Marketing',
          navigationUrl: '/marketing',
          icon: marketing
      },
      {
          id: 'analytics',
          title: 'Analytics',
          itemlabel: 'Analytics',
          navigationUrl: '/analytics',
          icon: analytics
      },
      {
          id: 'assets',
          title: 'Assets',
          itemlabel: 'Assets',
          navigationUrl: '/assets/brands',
          icon: assets,
          expandable: true
      },

      {
          id: 'assets-brands',
          title: 'Brand',
          itemlabel: 'Brands',
          navigationUrl: '/assets/brands',
          parentId: 'assets'
      },
      {
          id: 'assets-products',
          title: 'Product',
          itemlabel: 'Products',
          navigationUrl: '/assets/products',
          parentId: 'assets'
      },

      {
          id: 'admin',
          title: 'Admin',
          itemlabel: 'Admin',
          navigationUrl: '/admin/wallet',
          icon: admin,
          expandable: true
      },

      {
          id: 'admin-wallet',
          title: 'Admin',
          itemlabel: 'Wallet',
          navigationUrl: '/admin/wallet',
          parentId: 'admin'
      },
      {
          id: 'admin-users',
          title: 'Admin',
          itemlabel: 'Users',
          navigationUrl: '/admin/users',
          parentId: 'admin'
      },
      {
          id: 'admin-account',
          title: 'Admin',
          itemlabel: 'Account',
          navigationUrl: '/admin/account',
          parentId: 'admin'
      },
      {
          id: 'admin-settings',
          title: 'Admin',
          itemlabel: 'Settings',
          navigationUrl: '/admin/settings',
          parentId: 'admin'
      }
  ];

  componentDidMount() {
      this.handleResize();
      window.addEventListener('resize', this.handleResize, true);
  }
  componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize, true);
  }
  handleResize() {
      if (window.innerWidth < 768) {
          if (
              !this.props.isMobile &&
        !this.props.loading &&
        !this.props.collapsed
          ) {
              document.getElementById('menuIcon').click();
          }
          this.props.setMobile(true);
      } else {
          const screenWrapper = document.getElementById('screenWrapper');
          if (screenWrapper) {
              screenWrapper.classList.remove('expandedWrapper');
          }
          this.props.setMobile(false);
      }
  }
  handleContentClickMobile() {}
  render() {
      if (!this.props.loading) {
      // const contentClassName = (window.innerWidth < 768 && this.props.collapsed) ? styles.masked : '';
          const sideMenuContainerClass = this.props.collapsed
              ? styles.collapsedSideMenu
              : styles.expandedSideMenu;
          return (
              <div className={styles.screenWrapper} id="screenWrapper">
                  <div className={styles.mainView} id="mainView">
                      <Header />
                      <div className={styles.innerMain}>
                          <div
                              className={[
                                  styles.sideMenuContainer,
                                  sideMenuContainerClass
                              ].join(' ')}
                          >
                              <SideNavigation menuItemsMap={this.menuItemsMap} />
                          </div>
                          <div
                              className={[styles.innerContent].join(' ')}
                              ref={this.contentContainerRef}
                          >
                              {this.props.location.pathname.indexOf('/admin') === -1 ? (
                                  <div />
                              ) : (
                                  <span />
                              )}

                              <div className={styles.screenContainer}>
                                  <Switch>
                                      <Route exact path="/" component={Dashboard} />

                                      <Route exact path="/dashboard-2" component={Dashboard2} />
                                      <Route exact path="/batch" component={Batches} />
                                      <Route exact path="/batches" component={BatchesList} />
                                      <Route exact path="/batches/:id" component={EditBatch} />
                                      <Route exact path="/analytics" component={Analytics} />
                                      <Route exact path="/marketing" component={Marketing} />
                                      <Route exact path="/company-info" component={CompanyInfo} />
                                      <Route path="/admin" component={Admin} />
                                      <Route exact path="/billing" component={Billing} />
                                      <Route exact path="/contact" component={Contact} />
                                      <Route exact path="/help" component={FAQ} />
                                      <Route
                                          exact
                                          path="/change-password"
                                          component={ChangePassword}
                                      />
                                      <Route exact path="/edit-profile" component={EditProfile} />
                                      <Route exact path="/assets/brand" component={NewBrand} />

                                      <Route
                                          path="/assets/brands/:id"
                                          component={BrandTabs}
                                      />
                                      <Route exact path="/assets/brands" component={BrandsList} />
                                      <Route path="/assets/product" component={NewProduct} />
                                      <Route
                                          path="/assets/products/:id"
                                          component={EditProduct}
                                      />
                                      <Route path="/assets/products" component={ProductList} />
                                  </Switch>
                              </div>
                              <Footer />
                          </div>
                      </div>
                      <DrawerComponent />
                  </div>
              </div>
          );
      } else {
          return <Loader />;
      }
  }
}

export default withRouter(ViewWrapper);
