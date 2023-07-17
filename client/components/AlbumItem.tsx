import { ITrack } from "@/types/track";
import React from "react";
import styles from "../styles/TrackItem.module.scss";
import { Card, IconButton, Grid } from "@mui/material";
import { PlayArrow, Pause, Delete } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/redux";
import { setActiveTrack, setPlay } from "@/store/reducers/playerSlice";
import { getServerStaticUrl } from "@/utils/functions/getServerStaticUrl";
import { IAlbum } from "@/types/album";
import { deleteAlbumThunk } from "@/store/thunks/albumThunk";

type TrackItemProps = {
  album: IAlbum;
};

const AlbumItem: React.FC<TrackItemProps> = ({ album }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(deleteAlbumThunk(album._id))
  }
  return (
    <Card
      className={styles.track}
      onClick={() => router.push(`albums/${album._id}`)}
    >
      <img
        width={70}
        height={70}
        src={getServerStaticUrl(album.picture)}
      />
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{album.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{album.author}</div>
      </Grid>
      <IconButton
        onClick={handleDelete}
        style={{ marginLeft: "auto" }}
      >
        <Delete />
      </IconButton>
    </Card>
  );
};

export default AlbumItem;
