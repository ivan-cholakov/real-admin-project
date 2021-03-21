import { connect } from 'react-redux';
import {openDrawer} from '../../../../../components/common/drawer/container/actions';
import { getCampaign } from '../../../../../store/common/campaigns/actions';
import Marketing from '../';


const mapDispatchToProps = (dispatch) => ({
    openDrawer: (drawerData) => {
        dispatch(openDrawer(drawerData))
    },
    getMarketingFile: (id) => {
        return dispatch(getCampaign(id))
    },
});

export default connect(null, mapDispatchToProps)(Marketing);