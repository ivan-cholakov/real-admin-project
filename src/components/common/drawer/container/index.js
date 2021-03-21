import { connect } from 'react-redux';
import {closeDrawer, openDrawer} from './actions';
import DrawerComponent from '..';

const mapStateToProps = (state) => ({
    drawerInfo: state.DrawerReducer.drawerInfo,
    type: state.DrawerReducer.type
});
const mapDispatchToProps = (dispatch) => ({
    openDrawer: (drawerInfo) => (drawerData, componentType) => {
        if(drawerInfo.title !== '') {
            dispatch(closeDrawer()).then(
                dispatch(openDrawer(drawerData, componentType))
            )
        }else{
            dispatch(openDrawer(drawerData, componentType))
        }
    },
    closeDrawer: () => {
        dispatch(closeDrawer());
    },
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        openDrawer: dispatchProps.openDrawer(stateProps.drawerInfo),
    }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DrawerComponent);
