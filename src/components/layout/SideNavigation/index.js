import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './style.module.css';
import {
    plus,
    batches,
    marketing,
    analytics,
    assets,
    admin,
    dashboard
} from '../../../assets/icons/sideNavigation/icons.js';
import MenuItem from './MenuItem';
import AddNewOverlay from './AddNewOverlay';
import { Popover } from 'antd';
import SubMenuItem from './SubMenuItem';
class SideNavigation extends Component {
    constructor(props) {
        super(props);
        this.prevRoute = null;
        this.handleNavMenuClick = this.handleNavMenuClick.bind(this);
        this.menuItemsMap = this.props.menuItemsMap;
        this.state = {
            addOverlayVisible: false
        };
    }

  updateSelectionOnLocationChange = () => {
      if (this.prevRoute !== this.props.location.pathname) {
          this.prevRoute = this.props.location.pathname;
          //if page is refreshed, current page's location should be marked as active in side navigation
          const currRoute = this.props.location.pathname;
          const activeMenuItem = this.menuItemsMap.find(x => {
              return x.navigationUrl === currRoute;
          });
          if (activeMenuItem) {
              this.handleNavMenuClick(activeMenuItem.id);
          }
      }
  };
  hideOverlay = () => {
      this.setState({ addOverlayVisible: false });
  };

  componentDidMount() {
      this.updateSelectionOnLocationChange();
  }

  handleNavMenuClick(id) {
      const item = this.menuItemsMap.find(item => item.id === id);
      const title = item.title;
      this.props.changeNavActive(item.id);
      this.props.changeTitle(title);
      const hasSubmenu =
      this.menuItemsMap.filter(submenuItem => submenuItem.parentId === id)
          .length > 0;

      if (this.navigationAnimTimeout) {
          clearTimeout(this.navigationAnimTimeout);
      }

      if (!hasSubmenu) {
          this.navigationAnimTimeout = setTimeout(this.props.collapseMenu, 300);
      } else {
          this.navigationAnimTimeout = setTimeout(this.props.expandMenu, 300);
      }
      this.setState({ addOverlayVisible: false }, () => {
          this.props.history.push(item.navigationUrl);
      });
  }
  handleVisibleChange = addOverlayVisible => {
      this.setState({ addOverlayVisible });
  };
  render() {
      const _this = this;
      const collapsed = this.props.collapsed;
      const btnClass = collapsed ? styles.collapsedBtn : styles.expandedBtn;
      const expandedClass = collapsed ? '' : styles.expanded;
      const menuItems = this.props.menuItemsMap
          .filter(submenuItem => !submenuItem.parentId)
          .map(menuItem => {
              let selectedParentId = null;
              const subMenus = this.menuItemsMap
                  .filter(submenuItem => submenuItem.parentId === menuItem.id)
                  .map(submenuItem => {
                      const selectedItem = this.menuItemsMap.find(
                          item => this.props.selected === item.id
                      );
                      if (selectedItem) {
                          selectedParentId = selectedItem.parentId;
                      }
                      return (
                          <SubMenuItem
                              key={submenuItem.id}
                              selected={this.props.selected === submenuItem.id}
                              id={submenuItem.id}
                              label={submenuItem.itemlabel}
                              icon={submenuItem.icon}
                              handleMenuItemClick={_this.handleNavMenuClick}
                              collapsed={
                                  !(
                                      this.props.selected === submenuItem.id ||
                    this.props.selected === menuItem.id ||
                    selectedParentId === menuItem.id
                                  ) || collapsed
                              }
                          />
                      );
                  });
              let subMenuContainer = null;
              if (subMenus) {
                  subMenuContainer = (
                      <div className={[styles.submenuContainer].join(' ')}>
                          {subMenus}
                      </div>
                  );
              }

              return (
                  <span key={menuItem.id}>
                      <MenuItem
                          key={menuItem.id}
                          selected={
                              this.props.selected === menuItem.id ||
                menuItem.id === selectedParentId
                          }
                          id={menuItem.id}
                          expandable={menuItem.expandable}
                          label={menuItem.itemlabel}
                          icon={menuItem.icon}
                          handleMenuItemClick={this.handleNavMenuClick}
                          collapsed={collapsed}
                      />
                      {subMenuContainer}
                  </span>
              );
          });
      return (
          <div className={styles.navigationContainer + ' ' + expandedClass}>
              <div className={styles.iconsContainer}>
                  <div className={styles.topLevelIcons}>
                      <div className={styles.headerOverlay} />
                      <div className={styles.popover}>
                          <Popover
                              className={styles.popover}
                              placement="bottom"
                              onVisibleChange={this.handleVisibleChange}
                              content={
                                  <AddNewOverlay
                                      hideOverlay={() => {
                                          this.handleVisibleChange(false);
                                      }}
                                  />
                              }
                              align={{ offset: [5, -8] }}
                              visible={this.state.addOverlayVisible}
                              trigger="click"
                          >
                              <div className={styles.quickAddBtn}>
                                  <span>
                                      <div
                                          className={btnClass}
                                          onClick={() => {
                                              this.setState({ addOverlayVisible: true });
                                          }}
                                      >
                                          <div>{plus}</div>
                                          <div className={styles.shortText}>Add</div>
                                          <div className={styles.longText}>Quick Add</div>
                                      </div>
                                  </span>
                              </div>
                          </Popover>
                      </div>
                      <div className={styles.iconsContainer}>{menuItems}</div>
                  </div>
              </div>
          </div>
      );
  }
}
export default withRouter(SideNavigation);
