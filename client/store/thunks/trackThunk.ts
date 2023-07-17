import { createAsyncThunk } from "@reduxjs/toolkit";
import { tracksApi } from "@/queries/queries";
import { ITrack } from "@/types/track";

export const getTracksThunk = createAsyncThunk(
  'tracks',
  async (_, thunkApi) => {
    try {
      return await tracksApi.getAllTracks().then((data: ITrack[])=>{
        return data
      })
    } catch(e) {
      return thunkApi.rejectWithValue('Some Error')
    }
  }
)

export const deleteTrackThunk = createAsyncThunk(
  'track/delete',
  async (id: string, thunkApi) => {
    try {
      return await tracksApi.deleteTrack(id).then((data: string)=>{
        return data
      })
    } catch(e) {
      return thunkApi.rejectWithValue('Some Error')
    }
  }
)

export const searchTracksThunk = createAsyncThunk(
  'tracks/search',
  async (query: string, thunkApi) => {
    try {
      return await tracksApi.searchTracks(query).then((data: ITrack[])=>{
        return data
      })
    } catch(e) {
      return thunkApi.rejectWithValue('Some Error')
    }
  }
)
