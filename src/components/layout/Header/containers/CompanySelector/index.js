import { connect } from 'react-redux';
import CompanySelector from '../../../../CompanySelector';
import { selectCompany } from '../../../../../store/common/companies/actions';
import {getRoles} from "../../../../../store/common/users/actions";


const mapStateToProps = (state) => ({
    companies: state.Companies.companiesData
});

const mapDispatchToProps = (dispatch) => ({
    selectCompany: (id) => {
        dispatch(selectCompany(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanySelector);
