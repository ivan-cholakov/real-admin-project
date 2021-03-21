import { connect } from 'react-redux';
import ReadTrails from '../../../../components/forms/Trails/Read';


const mapStateToProps = (state) => ({
    trailsData: state.TrailsPage.trailsData,
    userProfile: state.User.userProfile
}); 

export default connect(mapStateToProps, null)(ReadTrails);
