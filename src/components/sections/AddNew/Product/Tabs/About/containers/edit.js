import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router-dom';
import About from '../index';
import { getBrands } from '../../../../../../../store/common/brands/actions';
import { getCertificates } from '../../../../../../../store/common/certificates/actions';
import { client } from '../../../../../../../core/client';
import {
    updateProductGallery,
    uploadProductCertificates,
    getProductCertificates,
    updateProduct
} from '../../../../../../../screens/Products/containers/Create/actions';
import { triggerNotification } from '../../../../../../common/Notification/actions';
import {
    resetValidationErrors,
    setValidationErrors
} from '../../../../../../../store/common/validation/actions';
import {
    getProduct,
    setCurrentProduct,
    updateProductPhoto,
    deleteProduct
} from '../../../../../../../screens/Products/containers/screen/actions';
import { Config } from '../../../../../../../core/config';

const config = new Config();

const mapStateToProps = state => ({
    certificates: state.Certificates.data || {},
    product: state.ProductsPage.productsData || {},
    user: state.UsersPage.userData.data,
    brands: state.Brands.brandsData,
    edit: true
});

const mapDispatchToProps = dispatch => ({
    getProduct: async id => {
        const baseUrl = config.getBaseUrl();
        const token = client.auth.getSessionToken();
        const {
            action: { payload }
        } = await dispatch(getProduct(id));
        dispatch(setCurrentProduct(payload));
        const {
            action: {
                payload: { data }
            }
        } = await dispatch(getProductCertificates(id));
        const res = await fetch(
            `${baseUrl}/storage${
                payload.mainImage
            }?token=${token}&width=480&height=480&quality=80`
        );
        payload.mainImage = await res.blob();
        if (payload.gallery.length) {
            const promises = payload.gallery.map(async url => {
                const res = await fetch(
                    `${baseUrl}/storage${url}?token=${token}&width=400&height=400&quality=80`
                );
                return res.blob();
            });
            payload.gallery = await Promise.all(promises);
        }
        payload.certificates = data.map(c => {
            // in case of hyperlink the file url is ablsolute
            let attachment;
            let hyperlink;
            const r = new RegExp('^(?:[a-z]+:)?//', 'i');
            if (r.test(c.file)) {
                hyperlink = c.file;
            } else {
                attachment = c.file;
            }
            return {
                attachment,
                hyperlink,
                type: c.type,
                note: c.description,
                startDate: c.startDate,
                validUntil: c.endDate
            };
        });
        return payload;
    },
    deleteProduct: id => {
        dispatch(deleteProduct(id)).then(res => {
            if (!res.action.payload.error) {
                dispatch(
                    triggerNotification({
                        type: 'success',
                        msg: 'Product was successfully deleted',
                        duration: 5
                    })
                );
                dispatch(push('/assets/products'));
            }
        });
    },
    getBrands: () => {
        dispatch(getBrands());
    },
    getCertificates: () => {
        dispatch(getCertificates());
    },
    onSubmit: async ({
        productId,
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
        featured
    }) => {
        const gallery = new FormData();
        photoGallery.map((p, i) => {
            const file = new File([p.originFileObj], 'file' + i, { type: p.type });
            gallery.append('images', file);
        });

        const params = {
            id: productId,
            displayName,
            description,
            about,
            contents,
            notes,
            skuCode: skuNumber,
            brandId,
            video: video || {},
            gallery: [],
            retailPrice,
            rewardPercentage,
            country,
            type: productType,
            externalLinks: {
                facebook,
                twitter,
                linkedin,
                youtube,
                snapchat,
                medium
            },
            featured
        };
        if (mainImage) {
            const image = new FormData();
            image.append('image', mainImage);
            const imageRes = await dispatch(updateProductPhoto(image));
            if (!imageRes.action.payload.error) {
                params.mainImage = imageRes.action.payload.identifier;
            }
        }
        if (photoGallery.length) {
            const galleryResponse = await dispatch(updateProductGallery(gallery));
            if (galleryResponse.value.length) {
                galleryResponse.value.forEach(file => {
                    params.gallery.push(file.identifier);
                });
            }
        }
        const validation = client.validator.product.update(params);
        if (validation.valid) {
            const {
                action: {
                    payload: { error }
                }
            } = await dispatch(updateProduct(params));
            if (error) {
                return dispatch(
                    triggerNotification({
                        type: 'error',
                        msg: 'Error editing the Product.',
                        duration: '10'
                    })
                );
            }

            const certs = certificates.map(cert => ({
                type: cert.type,
                description: cert.note,
                file: cert.hyperlink || cert.attachment,
                startDate: cert.startDate,
                endDate: cert.validUntil,
                ownerId: productId,
                ownerType: 'PRODUCT'
            }));
            await dispatch(uploadProductCertificates(productId, certs));
            dispatch(
                triggerNotification({
                    type: 'success',
                    msg: `Pruduct ${params.displayName} has been updated successfully!`,
                    duration: 10
                })
            );
            dispatch(push(`/assets/products/${productId}/contents`));
        } else {
            dispatch(setValidationErrors(validation.errors));
        }
    },
    resetValidationErrors: () => {
        dispatch(resetValidationErrors());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(About));
