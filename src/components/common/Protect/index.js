import _ from 'lodash';
import { connect } from 'react-redux';
import Protected from './Protected';

const mapStateToProps = (state) => ({
    permissions: _.get(state, 'User.userProfile.permissions') || [],
})
export const Protect = connect(mapStateToProps, {})(Protected);