const INITIAL_STATE = {
  game: null,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CREATE_GAME":
      return { ...state, game: action.payload };
    case "DELETE_GAME":
      return { ...state, game: null };
    default:
      return state;
  }
};

export default gameReducer;
