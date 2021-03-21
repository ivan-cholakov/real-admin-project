const initialState = {
  stockistsData: [],
  loading: true,
  selectedStockist: "",
};
export const Stockists = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "GET_STOCKISTS_PENDING":
      newState = Object.assign({}, state, {
        loading: true,
      });
      return newState;
    case "SET_SELECTED_STOCKIST":
      newState = Object.assign({}, state, {
        selectedStockist: action.payload,
      });
      return newState;
    case "GET_STOCKISTS_FULFILLED":
      if (!action.payload.error) {
        newState = Object.assign({}, state, {
          stockistsData: action.payload,
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
