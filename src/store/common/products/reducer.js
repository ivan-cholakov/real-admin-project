const initialState = {
  productsData: [],
  loading: true,
};
export const Products = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "GET_PRODUCTS_PENDING":
      newState = Object.assign({}, state, {
        loading: true,
      });
      return newState;
    case "GET_PRODUCTS_FULFILLED":
      if (!action.payload.error) {
        newState = Object.assign({}, state, {
          productsData: action.payload.data,
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
