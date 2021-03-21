import { client } from "../../../core/client";

export const getCompanies = () => {
  return (dispatch) => {
    return dispatch({
      type: "GET_COMPANIES",
      payload: client.company.list(),
    });
  };
};

export const selectCompany = (id) => ({
  type: "SELECT_COMPANY",
  payload: client.company.select(id),
});

export const setSelectedCompany = (id) => ({
  type: "SET_SELECTED_COMPANY",
  payload: id,
});

export const getCompany = (id) => {
  return (dispatch) => {
    return dispatch({
      type: "GET_COMPANY_BY_ID",
      payload: client.company.get(id),
    });
  };
};
export const updateCompanyPhoto = (formData) => {
  return (dispatch) => {
    return dispatch({
      type: "UPDATE_COMPANY_PHOTO",
      payload: client.company.uploadLogo(formData),
    });
  };
};
