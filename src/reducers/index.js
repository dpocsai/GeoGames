import { combineReducers } from "redux";

import gameReducer from "./gameReducer";
import googleAuthReducer from "./googleAuthReducer";

export default combineReducers({
  auth: googleAuthReducer,
  game: gameReducer,
});
