import { client } from "../../../core/client";

export const getProducts = () => {
  return (dispatch) => {
    return dispatch({
      type: "GET_PRODUCTS",
      payload: client.product.list(),
    });
  };
};

export const getProductEcoms = (productId) => {
  return (dispatch) => {
    return dispatch({
      type: "GET_ECOMS",
      payload: client.product.listEcoms(productId),
    });
  };
};

export const createProductEcom = (ecom, productId) => {
  if (!productId) {
    productId = ecom.ownerId;
  }
  return (dispatch) => {
    return dispatch({
      type: "CREATE_ECOM",
      payload: client.product.createEcom(ecom, productId),
    });
  };
};
