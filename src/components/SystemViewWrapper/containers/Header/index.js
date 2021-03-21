import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Header from '../../../layout/Header';
import { changeActive, changeTitle, collapseMenu, expandMenu } from './actions';
import { setUserProfile, signOut } from '../../../../store/common/user/actions';
import { openDrawer } from '../../../common/drawer/container/actions';
import {getRoles} from '../../../../store/common/users/actions';
import {getCompany} from '../../../../store/common/companies/actions';

const mapStateToProps = (state) => ({
    title : state.MainView.header.title,
    user: state.User.userProfile,
    collapsed: state.SideNavigation.collapsed,
    selectedCompany: state.Companies.selectedCompany,
    isMobile: state.MainView.screen.isMobile,
    companiesData: state.Companies.companiesData,
    company: state.CompaniesPage.companyData
});

const mapDispatchToProps = (dispatch) => ({
    collapseMenu: () => {
        dispatch(collapseMenu());
    },
    expandMenu: () => {
        dispatch(expandMenu());
    },
    changeNavActive: () => {
        dispatch(changeActive());
    },
    changeTitle: (title) => {
        dispatch(changeTitle(title));
    },
    openDrawer: (drawerData) => {
        return dispatch(openDrawer(drawerData))
    },
    getCompany: (id) => {
        return dispatch(getCompany(id));
    },
    signOut: () => {
        dispatch(signOut()).then(() => {
            //TODO
            dispatch(setUserProfile({}));
            localStorage.setItem('session', '');
            dispatch(push('/sign-in'));

        })
    },
    getRoles: () => {
        dispatch(getRoles());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
