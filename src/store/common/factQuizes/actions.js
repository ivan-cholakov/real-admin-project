import { client } from "../../../core/client";

export const fetchQuizes = () => (dispatch) =>
  dispatch({ type: "FETCH_QUIZES", payload: client.factQuiz.list() });

export const getQuiz = (id) => (dispatch) =>
  dispatch({ type: "GET_QUIZ", payload: client.factQuiz.get(id) });

export const updateQuiz = (factQuiz) => (dispatch) =>
  dispatch({ type: "UPDATE_QUIZ", payload: client.factQuiz.update(factQuiz) });

export const createQuiz = (factQuiz) => (dispatch) =>
  dispatch({
    type: "CREATE_QUIZ",
    payload: client.factQuiz.create(factQuiz),
  });

export const deleteQuiz = (id) => (dispatch) =>
  dispatch({ type: "DELETE_QUIZ", payload: client.factQuiz.delete(id) });
