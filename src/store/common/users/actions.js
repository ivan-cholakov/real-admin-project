import { client } from "../../../core/client";

export const getUsers = () => {
  return (dispatch) => {
    return dispatch({
      type: "GET_USERS",
      payload: client.user.list(),
    });
  };
};

export const getRoles = () => {
  return (dispatch) => {
    return dispatch({
      type: "GET_ROLES",
      payload: client.roles.list(),
    });
  };
};
