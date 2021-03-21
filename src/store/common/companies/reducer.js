const initialState = {
  companiesData: [],
  loading: true,
  selectedCompany: "",
};
export const Companies = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "GET_COMPANY_BY_ID_FULFILLED":
      newState = Object.assign({}, state, {
        companiesData: {
          data: [action.payload],
        },
        loading: false,
      });
      return newState;
    case "GET_COMPANIES_PENDING":
      newState = Object.assign({}, state, {
        loading: true,
      });
      return newState;
    case "SET_SELECTED_COMPANY":
      newState = Object.assign({}, state, {
        selectedCompany: action.payload,
      });
      return newState;
    case "GET_COMPANIES_FULFILLED":
      if (!action.payload.error) {
        newState = Object.assign({}, state, {
          companiesData: action.payload,
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
