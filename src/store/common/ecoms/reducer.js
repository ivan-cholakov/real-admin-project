const initialState = {
  ecomsData: {
    data: [],
  },
  loading: true,
  selectedEcom: "",
};
export const Ecoms = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "GET_ECOMS_PENDING":
      newState = Object.assign({}, state, {
        loading: true,
      });
      return newState;
    case "SET_SELECTED_ECOM":
      newState = Object.assign({}, state, {
        selectedEcom: action.payload,
      });
      return newState;
    case "GET_ECOMS_FULFILLED":
      if (!action.payload.error) {
        newState = Object.assign({}, state, {
          ecomsData: action.payload,
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
