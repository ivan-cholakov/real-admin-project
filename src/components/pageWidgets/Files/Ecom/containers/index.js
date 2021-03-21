import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getEcoms, createEcom, deleteEcom, updateEcom} from '../../../../../store/common/ecoms/actions';
import {getProductEcoms, createProductEcom} from '../../../../../store/common/products/actions';
import {getBrandEcoms, createBrandEcom} from '../../../../../store/common/brands/actions';
import EcomFile from '..';

const mapStateToProps = (state) => ({
    websites: state.Ecoms.ecomsData.data,
    companyId: state.User.userProfile.companyId,
});

const mapDispatchToProps = (dispatch) => ({
    createEcom: (ecom) => {
        return dispatch(createEcom(ecom));
    },
    createProductEcom: (ecom, productId) => {
        return dispatch(createProductEcom(ecom, productId));
    },
    createBrandEcom: (ecom, brandId) => {
        return dispatch(createBrandEcom(ecom, brandId));
    },
    getEcoms: () => {
        return dispatch(getEcoms());
    },
    getProductEcoms: (id) => {
        return dispatch(getProductEcoms(id));
    },
    getBrandEcoms: (id) => {
        return dispatch(getBrandEcoms(id));
    },
    deleteEcom: (id) => {
        return dispatch(deleteEcom(id));
    },
    updateEcom: (id) => {
        return dispatch(updateEcom(id));
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EcomFile));
