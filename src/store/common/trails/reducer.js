const initialState = {
  trailsData: [],
  loading: true,
  selectedTrail: "",
};
export const Trails = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "GET_TRAILS_PENDING":
      newState = Object.assign({}, state, {
        loading: true,
      });
      return newState;
    case "SET_SELECTED_TRAIL":
      newState = Object.assign({}, state, {
        selectedTrail: action.payload,
      });
      return newState;
    case "GET_TRAILS_FULFILLED":
      if (!action.payload.error) {
        newState = Object.assign({}, state, {
          trailsData: action.payload,
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
