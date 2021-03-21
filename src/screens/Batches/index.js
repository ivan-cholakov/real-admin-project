import React, { Component } from 'react';
import styles from './style.module.css';
import BatchData from '../../components/sections/Batches/BatchData/container';
import Rewards from '../../components/sections/Batches/Rewards/container';
import CostOverview from '../../components/sections/Batches/CostOverview/container';
import ProductFinder from '../../components/sections/Batches/ProductFinder/containers';
import DuplicateBatch from '../../components/pageWidgets/BatchActions/Duplicate';
import Marketing from '../../components/sections/Batches/Marketing/container';
import Transparency from '../../components/sections/Batches/Transparency/container';
import * as moment from 'moment';
import { client } from '../../core/client';
import SmallGreenButton from '../../components/pageWidgets/Buttons/SmallGreen';
import { Config } from '../../core/config';
import SmallRedButton from '../../components/pageWidgets/Buttons/SmallRed';

const config = new Config();

const protocol = config.getProtocol();
const host = config.getHost();
const port = config.getPort();
const apiUri = config.getApiUri();
const apiVersion = config.getApiVersion();

const initialFormData = {
    name: '',
    productId: null,
    trailId: null,
    stockistId: null,
    ecomId: null,
    startDate: new Date().valueOf(),
    duration: {
        value: '',
        measurement: 'na'
    },
    number: '#31',
    itemsCount: 'Enter Amount',
    paymentType: '1'
};
const initialInsentive = {
    percentage: 2
};

class Batches extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
            modal: {
                visible: false
            },
            certificates: [],
            formData: initialFormData,
            incentive: initialInsentive
        };

        this.props.getBrands();
        this.props.getProducts();
        this.props.getCampaigns();
        this.onFieldChange = this.onFieldChange.bind(this);
    }

  submitBatch = () => {
      this.props.submitBatch(this.state.formData, this.state.incentive);
  };

  deleteBatch = id => {
      this.props.deleteBatch(id);
  };

  async componentDidMount() {
      const { edit } = this.props;
      if (edit) {
          const { id } = this.props.match.params;
          const res = await this.props.getBatch(id);
          const {
              trailId,
              name,
              stockistId,
              productId,
              itemsCount,
              startDate,
              number,
              duration
          } = res.batch;
          const { percentage } = res.incentive;
          await this.handleProductChange(productId);
          this.setState({
              ...this.state,
              disabled: false,
              formData: {
                  ...this.state.formData,
                  productId,
                  itemsCount,
                  trailId,
                  stockistId,
                  startDate,
                  name,
                  id: id,
                  duration,
                  number
              },
              incentive: {
                  percentage
              }
          });
      }
  }
  handleProductChange = async id => {
      //   await this.props.getStockists(id);
      await this.props.getEcoms(id);
      await this.props.getCurrentProduct(id);
      const queryOptions = new client.QueryOptions();
      queryOptions.filter = { type: 'string', input: id, field: 'productId' };
      await this.props.getTrails(queryOptions);

      this.setState({
          disabled: false
      });
  };

  static getDerivedStateFromProps(props, state) {
      return { formData: state.formData };
  }

  onProductFieldChange = (value, name) => {
      this.setState({
          ...this.state,
          formData: {
              ...this.state.formData,
              [name]: value
          }
      });
  };
  onIncentiveChange = incentive => {
      incentive = { percentage: incentive };
      this.setState({ incentive });
  };

  batchNameGenerator = (productName, batchCount, date) => {
      let dateString = moment(date).format('MM/DD/YYYY');
      let batchName =
      '#' +
      productName.toUpperCase().replace(/ /g, '-') +
      '-B' +
      batchCount +
      '-' +
      dateString;
      this.onFieldChange('name', batchName);
  };

  async onFieldChange(name, value) {
      let state = {};

      switch (name) {
      case 'productId':
          //   await this.props.getStockists(value);
          await this.props.getEcoms(value);
          await this.props.getBatchCount(value);
          state.disabled = !value;
          await this.props.getCurrentProduct(value);
          this.batchNameGenerator(
              this.props.selectedProduct.displayName,
              this.props.batchesCount + 1,
              this.props.selectedProduct.createdAt
          );
          break;
      case 'percentage':
          name = 'incentive';
          value = { percentage: value };
          break;
      default:
          break;
      }
      if (name === 'productId') {
          this.handleProductChange(value);
      }
      this.setState({
          ...this.state,
          ...state,
          formData: {
              ...this.state.formData,
              [name]: value
          }
      });
  }

  handleVisibleChange(visible) {
      this.setState(this.state.modal, { visible });
  }

  createBatch = batchName => {
      this.setState(
          {
              ...this.state,
              formData: {
                  ...this.state.formData,
                  name: batchName
              }
          },
          () => {
              this.props.createBatch(this.state.formData, this.state.incentive);
          }
      );
  };

  render() {
      const { id } = this.props.match.params;
      return (
          <div className={styles.screenWrapper}>
              <div className={styles.saveBtnContainer}>
                  <DuplicateBatch createBatch={this.createBatch} />
                  <SmallGreenButton onClick={() => this.submitBatch()} title={'SAVE'} />
                  <SmallRedButton
                      onClick={() => this.deleteBatch(id)}
                      title={'DELETE'}
                  />
              </div>
              {this.props.edit && (
                  <img
                      className={styles.qrImage}
                      src={`${protocol}://${host}:${port}${apiUri}${apiVersion}/batches/${
                          this.props.match.params.id
                      }/qr?token=${client.auth.getSessionToken()}`}
                  />
              )}
              <BatchData
                  onFieldChange={this.onFieldChange}
                  disabled={this.state.disabled}
                  formData={this.state.formData}
              />

              <Rewards
                  onIncentiveChange={this.onIncentiveChange}
                  incentive={this.state.incentive}
                  onFieldChange={this.onFieldChange}
                  disabled={this.state.disabled}
                  formData={this.state.formData}
              />
              <Marketing
                  campaignsData={this.props.campaignsData || []}
                  onFieldChange={this.onFieldChange}
                  disabled={this.state.disabled}
                  formData={this.state.formData}
              />
              <Transparency
                  onFieldChange={this.onFieldChange}
                  disabled={this.state.disabled}
                  formData={this.state.formData}
              />
              <ProductFinder
                  onFieldChange={this.onFieldChange}
                  disabled={this.state.disabled}
                  formData={this.state.formData}
              />
              <CostOverview
                  submitBatch={this.submitBatch}
                  onFieldChange={this.onFieldChange}
                  incentive={this.state.incentive}
                  disabled={this.state.disabled}
                  formData={this.state.formData}
                  deleteBatch={this.deleteBatch}
                  batchId={this.props.match.params.id}
              />
          </div>
      );
  }
}

export default Batches;
