import { connect } from 'react-redux';
import ReadProduct from '../../../../Read';


const mapStateToProps = (state) => ({
    productData: state.ProductsPage.productData,
    userProfile: state.User.userProfile
}); 

export default connect(mapStateToProps, null)(ReadProduct);