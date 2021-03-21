import { client } from "../../../core/client";
import { getError } from "../commonActions";

export const inviteOwner = (params) => async (dispatch) => {
  const data = await dispatch({
    type: "INVITE_OWNER",
    payload: client.auth.inviteOwner(params),
  });
  return data;
};
export const inviteUser = (params) => async (dispatch) => {
  const data = await dispatch({
    type: "INVITE_USER",
    payload: client.auth.inviteUser(params),
  });
  return data;
};

export const inviteAccept = (params) => async (dispatch) => {
  const data = await dispatch({
    type: "INVITE_OWNER_ACCEPT",
    payload: client.auth.inviteAccept(params),
  });
  return data;
};

export const loginUser = (username, password) => async (dispatch) => {
  const data = await dispatch({
    type: "LOGIN_USER",
    payload: client.auth.login(username, password),
  });
  if (getError(data)) {
    // login failed error
    return data;
  }
  const res = await dispatch(getProfile());
  const {
    action: { payload },
  } = res;
  dispatch(setUserProfile(payload));
  return res;
};

export const registerUser = (username, password) => async (dispatch) => {
  const response = await dispatch({
    type: "REGISTER",
    payload: client.auth.register({ username, password }),
  });
  if (getError(response)) {
    return response;
  }
  const loginResponse = await dispatch(loginUser(username, password));
  return loginResponse;
};

export const signOut = () => {
  return (dispatch) => {
    return dispatch({
      type: "SIGN_OUT",
      payload: client.auth.logout(),
    });
  };
};

export const getProfile = () => {
  return (dispatch) => {
    return dispatch({
      type: "GET_PROFILE",
      payload: client.user.getProfile(),
    });
  };
};

export const setUserProfile = (userProfile) => {
  return (dispatch) => {
    return dispatch({
      type: "SET_USER_PROFILE",
      payload: userProfile,
    });
  };
};
export const getUserByInviteToken = (userId, token) => {
  return (dispatch) => {
    return dispatch({
      type: "GET_USER_BY_INVITE",
      payload: client.user.getWithInviteToken(userId, token),
    });
  };
};

export const getProfileDone = (val) => {
  return (dispatch) => {
    return dispatch({
      type: "GET_PROFILE_DONE",
      payload: val,
    });
  };
};

export const setProfilePicture = (profileImage) => {
  let formData = new FormData();
  formData.set("profile", profileImage);
  return (dispatch) => {
    return dispatch({
      type: "SET_PROFILE_PICTURE",
      payload: client.user.uploadProfileImage(formData),
    });
  };
};

export const updateProfileInfo = (profile) => {
  return (dispatch) => {
    return dispatch({
      type: "UPDATE_PROFILE_INFO",
      payload: client.user.updateProfile(profile),
    });
  };
};
export const forgottenPassword = (account) => {
  return (dispatch) => {
    return dispatch({
      type: "FORGOTTEN_PASSWORD",
      payload: client.auth.passwordRecoveryViaEmail(account),
    });
  };
};

export const changePassword = (password, newPassword) => {
  return (dispatch) => {
    return dispatch({
      type: "CHANGE_PASSWORD",
      payload: client.auth.changePassword(password, newPassword),
    });
  };
};

export const passwordRecovery = (password, token) => {
  return (dispatch) => {
    return dispatch({
      type: "PASSWORD_RECOVERY",
      payload: client.auth.verifyPasswordRecovery(password, token),
    });
  };
};

export const setUserLoading = (val) => {
  return (dispatch) => {
    return dispatch({
      type: "SET_USER_LOADING",
      payload: val,
    });
  };
};
