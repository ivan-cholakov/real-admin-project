import { client } from "../../../core/client";

export const getStockists = (productId) => {
  return (dispatch) => {
    return dispatch({
      type: "GET_STOCKISTS",
      payload: client.stockist.list(productId),
    });
  };
};

export const selectStockist = (id) => ({
  type: "SELECT_STOCKIST",
  payload: client.stockist.select(id),
});

export const setSelectedStockist = (id) => ({
  type: "SET_SELECTED_STOCKIST",
  payload: id,
});

export const getStockist = (id) => {
  return (dispatch) => {
    return dispatch({
      type: "GET_STOCKIST_BY_ID",
      payload: client.stockist.get(id),
    });
  };
};
export const updateStockistPhoto = (id, formData) => {
  return (dispatch) => {
    return dispatch({
      type: "UPDATE_STOCKIST_PHOTO",
      payload: client.stockist.uploadLogo(id, formData),
    });
  };
};
