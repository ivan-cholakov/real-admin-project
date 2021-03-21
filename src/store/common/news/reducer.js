const initialNewsPageState = {
  newsData: [],
  loading: true,
};

const initialNewsState = {
  // aPieceOfNewsData: {
  //     categoryId: '',
  //     content: '',
  //     createdAt: 0,
  //     date: 0,
  //     entityName: '',
  //     heading: '',
  //     id: '',
  //     image: '',
  //     lastUpdated: 0
  // },
  aPieceOfNewsData: null,
  loading: true,
};

export const NewsPage = (state = initialNewsPageState, action) => {
  switch (action.type) {
    case "GET_NEWS_PENDING":
      return { ...state, loading: true };
    case "GET_NEWS_FULFILLED":
      if (!action.payload.error) {
        return {
          ...state,
          newsData: action.payload.data,
          loading: false,
        };
      } else {
        return { ...state, loading: false };
      }
    default:
      return state;
  }
};

export const News = (state = initialNewsState, action) => {
  switch (action.type) {
    case "GET_A_PIECE_OF_NEWS_PENDING":
      return { ...state, loading: true };
    case "GET_A_PIECE_OF_NEWS_FULFILLED":
      if (!action.error) {
        return { ...state, aPieceOfNewsData: action.payload };
      }
      return state;
    case "CREATE_A_PIECE_OF_NEWS":
      return state;
    case "UPDATE_A_PIECE_OF_NEWS":
      return state;
    case "DELETE_A_PIECE_OF_NEWS":
      return state;
    case "RESET_STATE":
      return initialNewsState;
    default:
      return state;
  }
};
