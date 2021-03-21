import { client } from "../../../core/client";

export const getNews = () => (dispatch) =>
  dispatch({ type: "GET_NEWS", payload: client.news.list() });

export const getAPieceOfNews = (id) => (dispatch) =>
  dispatch({
    type: "GET_A_PIECE_OF_NEWS",
    payload: client.news.get(id),
  });

export const createAPieceOfNews = (news) => (dispatch) => {
  return dispatch({
    type: "CREATE_A_PIECE_OF_NEWS",
    payload: client.news.create(news),
  });
};

export const updateAPieceOfNews = (news) => (dispatch) =>
  dispatch({
    type: "UPDATE_A_PIECE_OF_NEWS",
    payload: client.news.update(news),
  });

export const deleteAPieceOfNews = (id) => (dispatch) =>
  dispatch({
    type: "DELETE_A_PIECE_OF_NEWS",
    payload: client.news.delete(id),
  });

export const setNewsPhoto = (val) => (dispatch) =>
  dispatch({ type: "SET_NEWS_PHOTO", payload: val });

export const updateNewsPhoto = (formData) => (dispatch) =>
  dispatch({
    type: "UPDATE_NEWS_PHOTO",
    payload: client.news.uploadImage(formData),
  });

export const resetState = () => (dispatch) =>
  dispatch({ type: "RESET_STATE", payload: {} });
