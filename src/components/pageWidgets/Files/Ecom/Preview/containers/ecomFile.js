import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createEcom, getEcoms, deleteEcom, updateEcom } from '../../../../../../store/common/ecoms/actions';
import EcomFile from '../..';

const mapStateToProps = (state) => ({
    websites: state.Ecoms.ecomsData.data
});

const mapDispatchToProps = (dispatch) => ({
    createEcom: (ecom) => {
        return dispatch(createEcom(ecom));
    },
    getEcoms: (id) => {
        return dispatch(getEcoms(id));
    },
    deleteEcom: (id) => {
        return dispatch(deleteEcom(id));
    },
    updateEcom: (id) => {
        return dispatch(updateEcom(id));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EcomFile));
