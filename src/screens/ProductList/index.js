import React from 'react';
import shortid from 'shortid';
import _ from 'lodash';
import { Checkbox } from 'antd';
import BlueButton from '../../components/pageWidgets/Buttons/Blue';
import styles from './style.module.css';
import { Config } from '../../core/config';
import { client } from '../../core/client';

const config = new Config();

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updatedProducts: [],
            products: [],
        };
    }
    static defaultProps = {    
        products: [],
        getProducts: () => {}
    }

    static getDerivedStateFromProps(props, state) {
        if (!_.isEqual(_.sortBy(props.products), _.sortBy(state.products))) {
            return { products: props.products }
        }
        return null;
    }

    componentDidMount() {
        this.props.getProducts();
    }

    handleProductClick = (p) => () => {
        const { history } = this.props;
        history.push(`/assets/products/${p.id}/about`)
    }

    onCheckBoxChange = (p) => {
        p.featured = !p.featured;
        const products = this.state.updatedProducts;
        const index = products.findIndex((brand) => brand.id === p.id);
        if (index !== -1) {
            products[index] = p;
        } else {
            products.push(p);
        }
        this.setState({
            updatedProducts: products,
        });
    }

    handleSubmit = async () => {
        await this.props.onSubmit(this.state.updatedProducts);
        this.setState({
            updatedProducts: [],
        });

    }

    renderProducts = () => {
        const { products } = this.props;
        const baseUrl = `${config.getBaseUrl()}/storage`;
        const token = client.auth.getSessionToken();
        return products.map(p => (
            <div key={shortid.generate()}>
                <div
                    className={styles.productCard}
                    onClick={this.handleProductClick(p)}
                >
                    <div className={styles.productImageWrapper}>
                        <img className={styles.productImage} src={`${baseUrl}${p.mainImage}/?token=${token}&width=210&height=210&quality=80`} alt=""/>
                    </div>
                    <div>
                        <h1 className={styles.productName}>{p.displayName}</h1>
                    </div>
                    <div className={styles.productDescription}>
                        <p>{p.description}</p>
                    </div>
                </div>
                <span >
                    <Checkbox
                        checked={p.featured}
                        onChange={this.onCheckBoxChange.bind(null, p)}
                    >
                    Featured
                    </Checkbox>
                </span>
            </div>
        ))
    }

    render() {
        return (
            <>
                <div className={styles.wrapper}>
                    {this.renderProducts()}
                </div>
                <div className={styles.saveButtonWrapper}>
                    <BlueButton
                        onClick={this.handleSubmit}
                        title={'SAVE'}
                    />
                </div>
            </>
        )
    }
}


export default ProductList;