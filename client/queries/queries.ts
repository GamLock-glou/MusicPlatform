import { SERVER_URL } from "@/config/config";
import { IPostComment, IPostTrack, ITrack } from "@/types/track";
import axios from "axios";

const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    Accept: "application/json",
  },
});

export const tracksApi = {
  async getAllTracks() {
    return await instance.get("/tracks").then((response) => response.data);
  },
  async createTrack(data: FormData) {
    return await instance
      .post("/tracks", data)
      .then((response) => response.data);
  },
  async getOneTack(id: string) {
    return await instance
      .get(`/tracks/${id}`)
      .then((response) => response.data);
  },
  async searchTracks(query: string): Promise<ITrack[]> {
    return await instance
      .get(`/tracks/search?query=${query}`)
      .then((response) => response.data);
  },
  async deleteTrack(id: string): Promise<string> {
    return await instance
      .delete(`/tracks/${id}`)
      .then((response) => response.data);
  },
};

export const albumsApi = {
  async getAllAlbums() {
    return await instance.get("/albums").then((response) => response.data);
  },
  async getOneAlbum(id: string) {
    return await instance
      .get(`/albums/${id}`)
      .then((response) => response.data);
  },
  async createAlbum(data: FormData) {
    return await instance
      .post("/albums", data)
      .then((response) => response.data);
  },
  async deleteAlbum(id: string): Promise<string> {
    return await instance
      .delete(`/albums/${id}`)
      .then((response) => response.data);
  },
  // async searchTracks(query: string): Promise<ITrack[]> {
  //   return await instance
  //     .get(`/albums/tracks/search?query=${query}`)
  //     .then((response) => response.data);
  // },
};

export const commentsApi = {
  async createComment(data: IPostComment) {
    return await instance.post("/tracks/comment", data);
  },
};
