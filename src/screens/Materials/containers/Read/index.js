import { connect } from 'react-redux';
import ReadMaterial from '../../../../Read';


const mapStateToProps = (state) => ({
    materialData: state.MaterialsPage.materialData,
    userProfile: state.User.userProfile
}); 

export default connect(mapStateToProps, null)(ReadMaterial);
