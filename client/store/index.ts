import { createWrapper } from "next-redux-wrapper";
import {
  AnyAction,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import playerSlice from "./reducers/playerSlice";
import trackSlice from "./reducers/trackSlice";
import logger from 'redux-logger';
import albumSlice from "./reducers/albumsSlice";

const rootReducer = combineReducers({
  playerReducer: playerSlice,
  trackReducer: trackSlice,
  albumReducer: albumSlice,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];


export const wrapper = createWrapper<AppStore>(setupStore);

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>