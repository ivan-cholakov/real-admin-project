import React from 'react';
import _ from 'lodash';
import shortid from 'shortid';
import { Checkbox } from 'antd';
import styles from './style.module.css';
import { Config } from '../../core/config';
import { client } from '../../core/client';
import BlueButton from '../../components/pageWidgets/Buttons/Blue';

const config = new Config();

class BrandList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updatedBrands: [],
            brands: []
        };
    }

  static defaultProps = {
      brands: [],
      getBrands: () => {}
  };

  static getDerivedStateFromProps(props, state) {
      if (!_.isEqual(_.sortBy(props.brands), _.sortBy(state.brands))) {
          return { brands: props.brands };
      }
      return null;
  }

  componentDidMount() {
      this.props.getBrands();
  }

  handleBrandClick = b => {
      const { history } = this.props;
      history.push(`/assets/brands/${b.id}`);
  };

  onCheckBoxChange = b => {
      b.featured = !b.featured;
      const brands = this.state.updatedBrands;
      const index = brands.findIndex(brand => brand.id === b.id);
      if (index !== -1) {
          brands[index] = b;
      } else {
          brands.push(b);
      }
      this.setState({
          updatedBrands: brands
      });
  };
  handleSubmit = async () => {
      await this.props.onSubmit(this.state.updatedBrands);
      this.setState({
          updatedBrands: []
      });
  };

  renderBrands = () => {
      const { brands } = this.props;
      const baseUrl = config.getBaseUrl();
      const token = client.auth.getSessionToken();
      return brands.map(b => (
          <div key={shortid.generate()}>
              <div
                  className={styles.brandCard}
                  onClick={() => this.handleBrandClick(b)}
              >
                  <div className={styles.brandImageWrapper}>
                      <img
                          className={styles.brandImage}
                          src={`${baseUrl}/storage${
                              b.logo
                          }?token=${token}&width=210&height=210&quality=80`}
                          alt=""
                      />
                  </div>
                  <div>
                      <h1 className={styles.brandName}>{b.displayName}</h1>
                  </div>
                  <div className={styles.brandDescription}>
                      <p>{b.description}</p>
                  </div>
              </div>
              <span>
                  <Checkbox
                      checked={b.featured}
                      onChange={this.onCheckBoxChange.bind(null, b)}
                  >
            Featured
                  </Checkbox>
              </span>
          </div>
      ));
  };

  render() {
      return (
      <>
        <div className={styles.wrapper}>{this.renderBrands()}</div>
        {this.props.brands.length ? (
            <div className={styles.saveButtonWrapper}>
                <BlueButton onClick={this.handleSubmit} title={'SAVE'} />
            </div>
        ) : null}
      </>
      );
  }
}

export default BrandList;
