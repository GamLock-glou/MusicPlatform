import { ITrack } from '@/types/track';
import React from 'react';
import { Grid, Box } from '@mui/material'
import TrackItem from './TrackItem';
import { IAlbum } from '@/types/album';
import AlbumItem from './AlbumItem';

type TrackListProps = {
  albums: IAlbum[]
}

const AlbumList: React.FC<TrackListProps> = ({albums}) => {
  return (
    <Grid container direction="column">
      <Box p={2}>
        {albums.map(album => <AlbumItem album={album} key={album._id} />)}
      </Box>
    </Grid>
  )
}
export default AlbumList;
