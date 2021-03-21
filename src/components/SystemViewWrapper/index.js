import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import styles from './style.module.css';
import './antdCustom.css';
import SideNavigation from './containers/SideNavigation';
import Header from './containers/Header';

import DrawerComponent from '../common/drawer/container/index';
import Footer from '../layout/Footer';

import InviteCompany from '../../screens/InviteCompany/container';
import Categories from '../../screens/Categories';
import NewsList from '../../screens/NewsList/container';
import CreateNews from '../../screens/News/container/Create';
import EditNews from '../../screens/News/container/Edit';
import ReadNews from '../../screens/News/container/Read';
import FactQuizList from '../../screens/FactQuizList/container';
import FactQuizCreate from '../../screens/FactQuiz/container/Create';
import FactQuizEdit from '../../screens/FactQuiz/container/Edit';

import {
    dashboard,
    batches,
    marketing
} from '../../assets/icons/sideNavigation/icons';

class SystemViewWrapper extends Component {
    constructor(props) {
        super(props);
        this.isMobile = false;
        this.contentContainerRef = React.createRef();

        this.handleResize = this.handleResize.bind(this);
    }

  menuItemsMap = [
      {
          id: 'dashboard',
          title: 'Invite Company',
          itemlabel: 'Invite Company',
          navigationUrl: '/system/invite/company',
          icon: dashboard
      },

      {
          id: 'batches',
          title: 'Categories',
          itemlabel: 'Categories',
          navigationUrl: '/system/categories',
          icon: batches
      },
      {
          id: 'factQuizes',
          title: 'Fact Quizes',
          itemlabel: 'FactQuizes',
          navigationUrl: '/system/factQuizes',
          icon: marketing
      },
      {
          id: 'news',
          title: 'News',
          itemlabel: 'News',
          navigationUrl: '/system/news',
          icon: dashboard
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
                          <div className={styles.screenContainer}>
                              <Switch>
                                  <Route
                                      exact
                                      path="/system/invite/company"
                                      component={InviteCompany}
                                  />
                                  <Route
                                      exact
                                      path="/system/categories"
                                      component={Categories}
                                  />
                                  <Route exact path="/system/news" component={NewsList} />
                                  <Route
                                      exact
                                      path="/system/news/create"
                                      component={CreateNews}
                                  />
                                  <Route
                                      exact
                                      path="/system/news/:id/edit"
                                      component={EditNews}
                                  />
                                  <Route exact path="/system/news/:id" component={ReadNews} />
                                  <Route
                                      exact
                                      path="/system/factQuizes"
                                      component={FactQuizList}
                                  />
                                  <Route
                                      exact
                                      path="/system/factQuizes/create"
                                      component={FactQuizCreate}
                                  />
                                  <Route
                                      exact
                                      path="/system/factQuizes/:id/edit"
                                      component={FactQuizEdit}
                                  />
                              </Switch>
                          </div>
                          <Footer />
                      </div>
                  </div>
                  <DrawerComponent />
              </div>
          </div>
      );
  }
}

export default withRouter(SystemViewWrapper);
