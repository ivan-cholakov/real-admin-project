const initialState = {
  usersData: [],
  roles: [],
  loading: true,
  rolesLoading: true,
};
export const Users = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "GET_USERS_PENDING":
      newState = Object.assign({}, state, {
        loading: true,
      });
      return newState;
    case "GET_USERS_FULFILLED":
      if (!action.payload.error) {
        newState = Object.assign({}, state, {
          usersData: action.payload.data,
          loading: false,
        });
        return newState;
      } else {
        newState = Object.assign({}, state, {
          loading: false,
        });
        return newState;
      }
    case "GET_ROLES_PENDING":
      newState = Object.assign({}, state, {
        rolesLoading: true,
      });
      return newState;
    case "GET_ROLES_FULFILLED":
      newState = Object.assign({}, state, {
        roles: action.payload,
        rolesLoading: false,
      });
      return newState;
    default:
      return state;
  }
};
