import { client } from "../../../core/client";

export const getBrands = () => {
  return (dispatch) => {
    return dispatch({
      type: "GET_BRANDS",
      payload: client.brand.list(),
    });
  };
};
export const getBrandEcoms = (brandId) => {
  return (dispatch) => {
    return dispatch({
      type: "GET_ECOMS",
      payload: client.brand.listEcoms(brandId),
    });
  };
};

export const createBrandEcom = (ecom, brandId) => {
  if (!brandId) {
    brandId = ecom.ownerId;
  }
  return (dispatch) => {
    return dispatch({
      type: "CREATE_ECOM",
      payload: client.brand.createEcom(ecom, brandId),
    });
  };
};
