const initialState = {
    drawerInfo: { visible: false, action: '', title: '' },
    brandData: { contact: {} },
    brandPhoto: ''
};
export const BrandsPage = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'SET_BRAND_PHOTO':
        newState = Object.assign({}, state, {
            brandPhoto: action.payload
        });
        return newState;
    case 'GET_BRAND_BY_ID_PENDING':
        //also reset the company photo since this might be an edit.
        newState = Object.assign({}, state, {
            brandData: initialState.brandData
        });
        return newState;
    case 'GET_BRAND_BY_ID_FULFILLED':
        if (!action.payload.error) {
            newState = Object.assign({}, state, {
                brandData: action.payload
            });
            return newState;
        }
        return state;

    case 'GET_BRAND_CERTIFICATES_FULFILLED':
        if (!action.payload.error) {
            const certificates = action.payload.data.map(c => {
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

            return { ...state, certificates: certificates };
        }
        return state;
    default:
        return state;
    }
};
