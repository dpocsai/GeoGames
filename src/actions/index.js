export const signIn = (user) => {
  return { type: "SIGN_IN", payload: user };
};

export const signOut = () => {
  return { type: "SIGN_OUT" };
};

export const createGame = (game) => {
  return { type: "CREATE_GAME", payload: game };
};

export const deleteGame = () => {
  return { type: "DELETE_GAME" };
};
