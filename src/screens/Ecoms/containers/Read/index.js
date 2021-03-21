import { connect } from 'react-redux';
import ReadEcom from '../../../../components/forms/Ecoms/Read';


const mapStateToProps = (state) => ({
    ecomData: state.EcomsPage.ecomData,
    userProfile: state.User.userProfile
}); 

export default connect(mapStateToProps, null)(ReadEcom);
