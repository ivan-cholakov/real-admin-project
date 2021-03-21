import { connect } from 'react-redux';
import ReadBrand from '../../../../components/forms/Brands/Read';


const mapStateToProps = (state) => ({
    brandData: state.BrandsPage.brandData,
    userProfile: state.User.userProfile
}); 

export default connect(mapStateToProps, null)(ReadBrand);