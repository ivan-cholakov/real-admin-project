import { connect } from 'react-redux';
import CompanyAccount from '../..';
import { createCompany } from '../../../../../components/entityActions/Companies/CreateCompanyScreen/containers/Create/actions';
import { push } from 'connected-react-router';
import { selectCompany, updateCompanyPhoto } from '../../../../../store/common/companies/actions';
import { client } from '../../../../../core/client';
import { setValidationErrors, resetValidationErrors } from '../../../../../store/common/validation/actions';
import { getProfile, setUserProfile } from '../../../../../store/common/user/actions';


const mapStateToProps = (state) => ({
    userProfile: state.User.userProfile,
    validationErrors: state.Validation.validationErrors
});

const mapDispatchToProps = (dispatch) => ({
    submit: async (params) => {
        const formData = params.formData;
        const data = {
            name: formData.displayName || '',
            displayName: formData.displayName || '',
            description: formData.description || '',
            vatNumber: formData.vatNumber || '',
            regNumber: formData.regNumber || '',
            ownerId: '',
            industry: '',
            contact: {
                email: formData.email || '',
                phone: {
                    prefix: formData.phone.prefix || '+44',
                    number: formData.phone.number || ''
                },
            },
            address: {
                street: formData.street,
                city: formData.city,
                country: formData.country,
                zipCode: formData.zipCode
            }

        }
        if (formData.logo) {
            const photo = new FormData()
            photo.append('image', formData.logo)
            const imageRes =  await dispatch(updateCompanyPhoto(photo));
            if (!imageRes.action.payload.error){
                console.log(imageRes);
                data.image = imageRes.action.payload.identifier;
            }
        }
        const validation = client.validator.company.create(data);
        if (validation.valid) {
            const res = await dispatch(createCompany(data))
            await dispatch(selectCompany(res.action.payload.id))
            const res1 = await dispatch(getProfile())
            dispatch(setUserProfile(res1.action.payload))
            dispatch(push('/'))
        } else {
            dispatch(setValidationErrors(validation.errors))
        }
    },
    resetValidationErrors: () => {
        dispatch(resetValidationErrors());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CompanyAccount);

