import { client } from "../../../core/client";

export const getEcoms = (productId) => {
  return (dispatch) => {
    return dispatch({
      type: "GET_ECOMS",
      payload: client.product.listEcoms(productId),
    });
  };
};

export const selectEcom = (id) => ({
  type: "SELECT_ECOM",
  payload: client.ecom.select(id),
});

export const setSelectedEcom = (id) => ({
  type: "SET_SELECTED_ECOM",
  payload: id,
});

export const getEcom = (id) => {
  return (dispatch) => {
    return dispatch({
      type: "GET_ECOM_BY_ID",
      payload: client.ecom.get(id),
    });
  };
};

export const createEcom = (ecom) => {
  return (dispatch) => {
    return dispatch({
      type: "CREATE_ECOM",
      payload: client.ecom.create(ecom),
    });
  };
};

export const deleteEcom = (id) => {
  return (dispatch) => {
    return dispatch({
      type: "DELETE_ECOM",
      payload: client.ecom.delete(id),
    });
  };
};

export const updateEcom = (ecom) => {
  return (dispatch) => {
    return dispatch({
      type: "UPDATE_ECOM",
      payload: client.ecom.update(ecom),
    });
  };
};

export const updateEcomPhoto = (id, formData) => {
  return (dispatch) => {
    return dispatch({
      type: "UPDATE_ECOM_PHOTO",
      payload: client.ecom.uploadLogo(id, formData),
    });
  };
};
