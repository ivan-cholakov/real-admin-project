import React, { Component } from 'react';
import shortid from 'shortid';
import { Menu, Dropdown, Icon } from 'antd';
import styles from './style.module.css';
import { client } from '../../../core/client';
import { Config } from '../../../core/config';

const config = new Config();

const protocol = config.getProtocol();
const host = config.getHost();
const port = config.getPort();
const baseUrl = `${protocol}://${host}:${port}`;

// example data to work with dropdown :
// [
//     {
//         value: 'itemValue',
//         label:{
//             text:'Text to display',
//             image:'optional'
//         }
//     },
//     ...
// ]

class CustomDropdown extends Component {
    constructor(props) {
        super(props);
        this.fieldRef = React.createRef();
        this.state = {
            selectValue: this.props.value,
            selectTitle: this.props.value
                ? this.getOptionByValue(this.props.items, this.props.value).label.text
                : this.props.placeholder,
            isPlaceholder: !this.props.value
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            const item = this.getOptionByValue(this.props.items, this.props.value);
            if (item) {
                this.setState({
                    ...this.state,
                    selectValue: this.props.value,
                    selectTitle: item.label.text ? item.label.text : item.label,
                    isPlaceholder: false
                });
            }
        }
    }

  getOptionByValue = (data, value) => {
      let ret = null;
      for (var i = 0; i < data.length; i++) {
          if (data[i].value === value) {
              return data[i];
          } else if (
              data[i].children &&
        data[i].children.length &&
        typeof data[i].children === 'object'
          ) {
              ret = this.getOptionByValue(data[i].children, value);
              if (ret && ret.value === value) {
                  return ret;
              }
          }
      }
      return ret;
  };

  // getOptionByValue2 = (data, value) => {
  //     const match = data.find((x) => {
  //         return x.value === value;
  //     })
  //     if (match) return match;
  //     data.forEach((x) => {
  //         if (x.children.length) this.getOptionByValue2(x.children, value);
  //     })
  // }

  findSiblings(value, label, items) {
      items.forEach(x => {
          if (x.value === value) {
              //found match!
              const siblingWithChildren = items.find(y => {
                  return y.children;
              });
              if (siblingWithChildren === undefined) {
                  //doesn't have sibling with children, therefore take appropriate actions.
                  this.setState({ selectValue: value });
                  this.setState({ selectTitle: label.text ? label.text : label });
                  this.props.onChange(value);
              }
          } else {
              if (x.children) this.findSiblings(value, label, x.children);
          }
      });
  }
  handleChange(value, label) {
      if (this.props.allSelectable) {
          this.setState({ selectValue: value });
          this.setState({ selectTitle: label.text ? label.text : label });
          this.props.onChange(value);
      } else {
          this.findSiblings(value, label, this.props.items);
      }
      this.setState({ isPlaceholder: false });
  }
  menu = items => (
      <Menu>
          {items.map(item => {
              const s = {
                  backgroundSize: '25px 25px',
                  backgroundPosition: 'right 10px center'
              };
              const r = new RegExp('base64');
              if (item.label.image && !r.test(item.label.image)) {
                  s.backgroundImage = `url(${baseUrl}${
                      item.label.image
                  }?token=${client.auth.getSessionToken()})`;
              } else {
                  s.backgroundImage = `url(${item.label.image})`;
              }
              return item.children && item.children.length > 0 ? (
                  <Menu.SubMenu
                      key={shortid.generate()}
                      title={item.label.text ? item.label.text : item.label}
                  >
                      {this.menu(item.children)}
                  </Menu.SubMenu>
              ) : (
                  <Menu.Item
                      key={shortid.generate()}
                      onClick={() => {
                          this.handleChange(item.value, item.label);
                      }}
                      style={s}
                  >
                      {item.label.text ? item.label.text : item.label}
                  </Menu.Item>
              );
          })}
      </Menu>
  );
  getPopup = () => {
      return this.fieldRef.current;
  };

  render() {
      const fieldClass = this.props.underlined
          ? styles.underlined
          : styles.normalField;
      let productItems = this.props.items;
      if (!productItems) {
          productItems = [];
      }
      const colorClassName = this.props.grayColor ? styles.grayColor : '';
      return (
          <div
              className={[
                  styles.dropdownContainer,
                  colorClassName,
                  this.props.disabled ? 'disabled' : ''
              ].join(' ')}
          >
              <label className={styles.inputLabel} hidden={!this.props.label}>
                  {this.props.label}
              </label>
              <Dropdown
                  disabled={this.props.disabled}
                  trigger={['click']}
                  overlay={this.menu(productItems)}
                  overlayClassName={styles.dropdownSubmenu}
                  className={this.props.className}
                  getPopupContainer={trigger => trigger.parentNode}
              >
                  <span className={styles.dropDownMenu}>
                      <div
                          className={[
                              fieldClass,
                              this.state.isPlaceholder ? styles.placeholder : ' '
                          ].join(' ')}
                          ref={this.fieldRef}
                          style={this.props.style}
                      >
                          {this.state.selectTitle} <Icon type="down" />
                      </div>
                  </span>
              </Dropdown>
          </div>
      );
  }
}

export default CustomDropdown;
