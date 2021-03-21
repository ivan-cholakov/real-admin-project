import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import {
    selectCompany,
    setSelectedCompany
} from '../../../../store/common/companies/actions';
import ViewWrapper from '../..';
import { setMobile } from './actions';
import { getCompany } from '../../../../screens/Companies/containers/screen/actions';

const mapStateToProps = state => {
    return {
        user: state.User.userProfile,
        // companies: state.Companies.companiesData,
        loading: state.Companies.loading,
        // brands: state.Brands.brandsData,
        collapsed: state.SideNavigation.collapsed,
        isMobile: state.MainView.screen.isMobile
    };
};
const mapDispatchToProps = dispatch => ({
    // getCompanies: (user) => async () => {
    //     const res = await dispatch(getCompany(user.companyId))
    //     if (res.action.payload.id) {
    //         await dispatch(selectCompany(res.action.payload.id))
    //         await dispatch(setSelectedCompany(res.action.payload.id))
    //     } else {
    //         dispatch(push('/sign-in'));
    //     }
    // },
    setMobile: val => {
        dispatch(setMobile(val));
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps
    // getCompanies: dispatchProps.getCompanies(stateProps.user)
    };
};

// if at a later point we need to check if something else is loaded, merge props here and pass it to get companies so we can check props before setting loading to false.

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(ViewWrapper);
