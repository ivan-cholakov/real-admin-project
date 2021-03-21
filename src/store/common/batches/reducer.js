const initialState = {
  batchesData: [],
  loading: true,
};
export const Batches = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case "GET_BATCHES_PENDING":
      newState = Object.assign({}, state, {
        loading: true,
      });
      return newState;
    case "GET_BATCHES_FULFILLED":
      if (!action.payload.error) {
        newState = Object.assign({}, state, {
          batchesData: action.payload.data,
          loading: false,
        });
        return newState;
      } else {
        newState = Object.assign({}, state, {
          loading: false,
        });
        return newState;
      }
    default:
      return state;
  }
};

export const BatchesPage = (
  state = { data: {}, loading: true, batchesCount: "" },
  action
) => {
  let newState;
  switch (action.type) {
    case "GET_BATCH_BY_ID_FULFILLED":
      newState = Object.assign({}, state, {
        data: action.payload,
        loading: false,
      });
      return newState;

    case "GET_BATCH_COUNT_FULFILLED":
      newState = Object.assign({}, state, {
        batchesCount: action.payload,
      });
      return newState;

    default:
      return state;
  }
};
