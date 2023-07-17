import { albumsApi } from "@/queries/queries"
import { IAlbum } from "@/types/album"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getAlbumsThunk = createAsyncThunk(
  'albums',
  async (_, thunkApi) => {
    try {
      return await albumsApi.getAllAlbums().then((data: IAlbum[])=>{
        return data
      })
    } catch(e) {
      return thunkApi.rejectWithValue('Some Error')
    }
  }
)

export const deleteAlbumThunk = createAsyncThunk(
  'albums/delete',
  async (id: string, thunkApi) => {
    try {
      return await albumsApi.deleteAlbum(id).then((data: string)=>{
        return data
      })
    } catch(e) {
      return thunkApi.rejectWithValue('Some Error')
    }
  }
)