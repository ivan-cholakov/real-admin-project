import { client } from "../../../core/client";

export const getBatches = () => {
  return (dispatch) => {
    return dispatch({
      type: "GET_BATCHES",
      payload: client.batch.list(),
    });
  };
};

export const getBatch = (id) => {
  return (dispatch) => {
    return dispatch({
      type: "GET_BATCH_BY_ID",
      payload: client.batch.get(id),
    });
  };
};

export const createBatch = (batch, incentive) => {
  return (dispatch) => {
    return dispatch({
      type: "CREATE_BATCH",
      payload: client.batch.create(batch, incentive),
    });
  };
};

export const upadateBatch = (batch, incentive) => {
  return (dispatch) => {
    return dispatch({
      type: "UPDATE_BATCH",
      payload: client.batch.update(batch, incentive),
    });
  };
};

export const deleteBatch = (id) => {
  return (dispatch) => {
    return dispatch({
      type: "DELETE_BATCH",
      payload: client.batch.delete(id),
    });
  };
};
