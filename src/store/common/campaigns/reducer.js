const initialState = {
  campaignsData: [],
  loading: true,
  selectedCampaign: "",
};
export const Campaigns = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "GET_CAMPAIGNS_PENDING":
      newState = Object.assign({}, state, {
        loading: true,
      });
      return newState;
    case "GET_CAMPAIGNS_FULFILLED":
      if (!action.payload.error) {
        newState = Object.assign({}, state, {
          campaignsData: action.payload,
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
