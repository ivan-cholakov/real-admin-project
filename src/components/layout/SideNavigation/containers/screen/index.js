import { connect } from 'react-redux';
import { changeActive } from '../actions';
import SideNavigation from '../..';
import { changeTitle, collapseMenu, expandMenu } from '../../../../ViewWrapper/containers/Header/actions';

const mapStateToProps = (state) => {
    return {
        collapsed: state.SideNavigation.collapsed,
        selected: state.SideNavigation.selected,
        adminOverlay: state.SideNavigation.adminOverlay
    }
};
const mapDispatchToProps = (dispatch) => ({
    expandMenu: () => {
        dispatch(expandMenu());
    },
    collapseMenu: () => {
        dispatch(collapseMenu());
    },
    changeNavActive: (act) => {
        dispatch(changeActive(act));
    },
    changeTitle: (title) => {
        dispatch(changeTitle(title));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNavigation);