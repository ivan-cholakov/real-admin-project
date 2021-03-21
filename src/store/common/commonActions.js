export const getError = (r) => {
  const {
    action: {
      payload: { error: error },
    },
  } = r; // eslint-disable-line
  return error;
};
