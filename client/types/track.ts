export interface ITrack {
  _id: string;
  name: string;
  artist: string;
  text: string;
  listens: number;
  picture: string;
  audio: string;
  comments: IComments[];
  albumId?: string;
}

export interface TrackState {
  tracks: ITrack[];
  error: string;
  isLoading: boolean;
}

export interface IPostTrack {
  name: string;
  artist: string;
  text: string;
  picture: string;
  audio: string;
}

export interface IPostComment {
  username: string;
  text: string;
  trackId: string
}

export interface IComments {
  _id: string;
  username: string;
  text: string;
}