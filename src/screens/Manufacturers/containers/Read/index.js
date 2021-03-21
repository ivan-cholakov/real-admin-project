import { connect } from 'react-redux';
import ReadManufacturer from '../../../../Read';


const mapStateToProps = (state) => ({
    manufacturerData: state.ManufacturersPage.manufacturerData,
    userProfile: state.User.userProfile
}); 

export default connect(mapStateToProps, null)(ReadManufacturer);
