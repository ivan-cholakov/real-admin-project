import { connect } from 'react-redux';
import Rewards from '../';


const mapStateToProps = (state) => ({
    selectedProduct: state.ProductsPage.productData
});

export default connect(mapStateToProps)(Rewards);

