const INITIAL_STATE = {
  user: null,
};

const googleAuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, user: action.payload };
    case "SIGN_OUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export default googleAuthReducer;
