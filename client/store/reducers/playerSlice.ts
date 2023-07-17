import { PlayerState } from "@/types/player";
import { ITrack } from "@/types/track";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {HYDRATE} from "next-redux-wrapper";

const initialState: PlayerState = {
  active: null,
  volume: 100,
  duration: 0,
  currentTime: 0,
  pause: true,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPause: (state) => {
      state.pause = true;
    },
    setPlay: (state) => {
      state.pause = false;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setActiveTrack: (state, action: PayloadAction<ITrack>) => {
      state.active = action.payload;
      state.duration = 0;
      state.currentTime = 0;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user
      };
    },
  },
});

export const {
  setPause,
  setPlay,
  setActiveTrack,
  setDuration,
  setCurrentTime,
  setVolume,
} = playerSlice.actions;

export default playerSlice.reducer;
