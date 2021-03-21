import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router-dom';
import About from '../index';
import {getBrands} from '../../../../../../../store/common/brands/actions';
import { client } from '../../../../../../../core/client';
import {getCertificates} from '../../../../../../../store/common/certificates/actions';
import { updateProductGallery, createProduct, uploadProductCertificates } from '../../../../../../../screens/Products/containers/Create/actions';
import { triggerNotification } from '../../../../../../common/Notification/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../../../../store/common/validation/actions';
import { setCurrentProduct, updateProductPhoto } from '../../../../../../../screens/Products/containers/screen/actions';

const mapStateToProps = (state) => ({
    certificates: state.Certificates.data || {},
    user: state.UsersPage.userData.data,
    brands: state.Brands.brandsData,
});

const mapDispatchToProps = (dispatch) => ({
    getBrands: () => {
        dispatch(getBrands())
    },
    getCertificates: () => {
        dispatch(getCertificates())
    },
    onSubmit: async ({
        brandId,
        displayName,
        certificates,
        retailPrice,
        rewardPercentage,
        facebook,
        twitter,
        linkedin,
        youtube,
        snapchat,
        medium,
        country,
        description,
        productType,
        skuNumber,
        mainImage,
        video,
        photoGallery,
        about,
        contents,
        notes,
        featured,
    }) => {

        const gallery = new FormData();
        photoGallery.map((p, i) => {
            const file = new File([p.originFileObj], 'file' + i, { type: p.type });
            gallery.append('images', file);
        });


        const params = {
            displayName: displayName || '',
            description: description || '',
            about: about || '',
            contents,
            notes,
            skuCode: skuNumber,
            brandId: brandId || '',
            retailPrice,
            rewardPercentage,
            country,
            video: video || {},
            gallery: [],
            type: productType,
            externalLinks: {
                facebook,
                twitter,
                linkedin,
                youtube,
                snapchat,
                medium
            },
            featured,
        };
        if (mainImage) {
            const image = new FormData();
            image.append('image', mainImage)
            const imageRes = await dispatch(updateProductPhoto(image))
            if (!imageRes.action.payload.error) {
                params.mainImage = imageRes.action.payload.identifier;
            }
        }
        if (photoGallery.length) {
            const galleryResponse = await dispatch(updateProductGallery(gallery));
            if (galleryResponse.value.length) {
                galleryResponse.value.forEach((file) => {
                    params.gallery.push(file.identifier);
                });
            }
        }
        const validation = client.validator.product.create(params)
        if (validation.valid) {

            const { action: {payload: {error, id}}} = await dispatch(createProduct(params))
            if (error) {
                return dispatch(triggerNotification({
                    type: 'error',
                    msg: 'Error creating the Product.',
                    duration: '10',
                }))
            } 
            
            const certs = certificates.map(cert => ({
                type: cert.type,
                description: cert.note,
                file: cert.hyperlink || cert.attachment,
                startDate: cert.startDate,
                endDate: cert.validUntil,
                ownerId: id,
                ownerType: 'PRODUCT'
            }))
            await dispatch(uploadProductCertificates(id, certs));
            dispatch(triggerNotification({
                type: 'success',
                msg: `Pruduct ${params.displayName} has been created successfully!`,
                duration: '10',
            }))
            dispatch(setCurrentProduct({id, ...params}))
            dispatch(push(`/assets/products/${id}/contents`))

        } else {
            dispatch(setValidationErrors(validation.errors));
        }
    },
    resetValidationErrors: () => {
        dispatch(resetValidationErrors());
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(About));
