import { client } from "../../../core/client";

export const getCampaign = (id) => {
  return (dispatch) => {
    return dispatch({
      type: "GET_CAMPAIGN_BY_ID",
      payload: client.campaign.get(id),
    });
  };
};

export const getCampaigns = (options) => {
  return (dispatch) => {
    return dispatch({
      type: "GET_CAMPAIGNS",
      payload: client.campaign.list(options),
    });
  };
};
