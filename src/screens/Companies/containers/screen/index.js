import { connect } from 'react-redux';
import CompaniesList from '../..';
import { getCompanies } from '../../../../store/common/companies/actions';
import {openDrawer} from "../../../../components/common/drawer/container/actions";


const mapStateToProps = (state) => ({
    companiesData: state.Companies.companiesData
});
const mapDispatchToProps = (dispatch) => ({
    getCompanies: () => {
        dispatch(getCompanies())
    },
    openDrawer: (drawerData) => {
        dispatch(openDrawer(drawerData))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesList);