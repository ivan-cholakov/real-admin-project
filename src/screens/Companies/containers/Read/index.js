import { connect } from 'react-redux';
import Companyoverview from '../../../../components/entityActions/Companies/Overview';
import { openDrawer, closeDrawer } from '../../../../components/common/drawer/container/actions';
import {getCompany} from '../../../../store/common/companies/actions';

const mapStateToProps = (state) => ({
    companiesData: state.Companies.companiesData,
    selectedCompany: state.Companies.selectedCompany,
    userProfile: state.User.userProfile,
    companyData: state.CompaniesPage.companyData
}); 

const mapDispatchToProps = (dispatch) => ({
    openDrawer: (drawerData) => {
        dispatch(openDrawer(drawerData))
    },
    closeDrawer: () => {
        dispatch(closeDrawer())
    },
    getCompany: (id) => {
        dispatch(getCompany(id))
    }
});


export default connect(mapStateToProps, mapDispatchToProps )(Companyoverview);
