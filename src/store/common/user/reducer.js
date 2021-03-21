import { client } from "../../../core/client";

const initialState = {
  userProfile: {},
  loading: true,
};
export const User = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "GET_PROFILE_PENDING":
      newState = Object.assign({}, state, {
        loading: true,
      });
      return newState;
    case "GET_PROFILE_FULFILLED":
      if (action.payload.error) {
        //invalid session
        localStorage.removeItem("session");
      }
      newState = Object.assign({}, state, {
        userProfile: action.payload,
        loading: false,
      });
      client.access.setPermissions(action.payload.permissions);
      return newState;
    case "GET_PROFILE_REJECTED":
      newState = Object.assign({}, state, {
        loading: false,
      });
      return newState;
    case "LOGIN_USER_FULFILLED":
      if (!action.payload.error) {
        window.localStorage.setItem("session", client.auth.getSessionToken());
      }
      return state;
    case "SIGN_OUT":
      window.localStorage.setItem("session", "");
      return state;
    case "SET_USER_LOADING":
      newState = Object.assign({}, state, {
        loading: action.payload,
      });
      return newState;
    case "UPDATE_USER_PHOTO_FULFILLED":
      newState = Object.assign({}, state, {
        userProfile: {
          ...state.userProfile,
          profileImage: action.payload.identifier,
        },
      });
      return newState;
    case "UPDATE_COVER_PHOTO_FULFILLED":
      newState = Object.assign({}, state, {
        userProfile: {
          ...state.userProfile,
          coverImage: action.payload.identifier,
        },
      });
      return newState;
    default:
      return state;
  }
};
