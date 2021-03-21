const initialState = {
  factQuizes: [],
  loading: true,
};
export const FactQuizes = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_QUIZES_PENDING":
      return { ...state, loading: true };
    case "FETCH_QUIZES_FULFILLED":
      if (!action.payload.errors) {
        return { ...state, factQuizes: action.payload.data, loading: false };
      }
      return state;
    default:
      return state;
  }
};

const initialQuizState = {
  factQuiz: null,
  loading: false,
};

export const FactQuiz = (state = initialQuizState, action) => {
  switch (action.type) {
    case "GET_QUIZ_PENDING":
      return { ...state, loading: true };
    case "GET_QUIZ_FULFILLED":
      return { ...state, factQuiz: action.payload };
    default:
      return state;
  }
};
