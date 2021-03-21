const initialState = {
  brandsData: [],
  loading: true,
};
export const Brands = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "GET_BRANDS_PENDING":
      newState = Object.assign({}, state, {
        loading: true,
      });
      return newState;
    case "GET_BRANDS_FULFILLED":
      if (!action.payload.error) {
        newState = Object.assign({}, state, {
          brandsData: action.payload.data,
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
