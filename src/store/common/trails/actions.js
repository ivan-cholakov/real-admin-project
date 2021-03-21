import { client } from "../../../core/client";

export const getTrails = (options) => {
  return (dispatch) => {
    return dispatch({
      type: "GET_TRAILS",
      payload: client.trail.list(options),
    });
  };
};

export const createTrail = (payload) => {
  return (dispatch) => {
    return dispatch({
      type: "CREATE_TRAIL",
      payload: client.trail.create(payload),
    });
  };
};

export const updateTrail = (payload) => {
  return (dispatch) => {
    return dispatch({
      type: "UPDATE_TRAIL",
      payload: client.trail.update(payload),
    });
  };
};

export const setTrailData = (trailData) => {
  return (dispatch) => {
    return dispatch({
      type: "SET_TRAIL_DATA",
      payload: trailData,
    });
  };
};

export const selectTrail = (id) => ({
  type: "SELECT_TRAIL",
  payload: client.trail.select(id),
});

export const setSelectedTrail = (id) => ({
  type: "SET_SELECTED_TRAIL",
  payload: id,
});

export const getTrail = (id) => {
  return (dispatch) => {
    return dispatch({
      type: "GET_TRAIL_BY_ID",
      payload: client.trail.get(id),
    });
  };
};
export const updateTrailPhoto = (id, formData) => {
  return (dispatch) => {
    return dispatch({
      type: "UPDATE_TRAIL_PHOTO",
      payload: client.trail.uploadLogo(id, formData),
    });
  };
};
