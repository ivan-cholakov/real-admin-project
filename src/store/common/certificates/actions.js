import { client } from "../../../core/client";

export const getCertificates = () => {
  return (dispatch) => {
    return dispatch({
      type: "GET_CERTIFICATES",
      payload: client.product.certificates(),
    });
  };
};
