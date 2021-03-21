import { connect } from 'react-redux';
import { deleteCompany } from './actions';
import { triggerDrawer } from '../screen/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import DeleteCompany from '../../../../components/forms/Companies/Delete';
import { getCompanies } from '../../../../store/common/companies/actions';


const mapStateToProps = (state) => ({
    companyData: state.CompaniesPage.companyData,
    userProfile: state.User.userProfile
}); 

const mapDispatchToProps = (dispatch) => ({
    deleteCompany: (id) => {
        dispatch(deleteCompany(id)).then((res) => {
            if(!res.action.payload.error) {
                dispatch(triggerDrawer({visible: false, action: '', title: ''}));
                dispatch(triggerNotification({msg: 'Company was successfully deleted!', duration: 2, type: 'success'}));
                dispatch(getCompanies());
            }
        })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCompany);