const initialState = {
  productsData: [],
  loading: true,
};
export const Certificates = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "GET_CERTIFICATES_PENDING":
      newState = Object.assign({}, state, {
        loading: true,
      });
      return newState;
    case "GET_CERTIFICATES_FULFILLED":
      if (!action.payload.error) {
        newState = Object.assign({}, state, {
          data: action.payload,
          loading: false,
        });
        return newState;
      } else {
        newState = Object.assign({}, state, {
          loading: false,
        });
        return newState;
      }
    default:
      return state;
  }
};
