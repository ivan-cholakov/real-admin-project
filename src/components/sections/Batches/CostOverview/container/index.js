import { connect } from 'react-redux';
import CostOverview from '../';

const mapStateToProps = (state) => ({
    selectedProduct: state.ProductsPage.productData
});

export default connect(mapStateToProps)(CostOverview);

