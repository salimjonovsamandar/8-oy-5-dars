import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userTokenReducer from "./userToken";

const rootReducer = combineReducers({
  userToken: userTokenReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
