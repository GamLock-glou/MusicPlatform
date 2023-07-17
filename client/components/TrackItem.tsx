import { ITrack } from "@/types/track";
import React from "react";
import styles from "../styles/TrackItem.module.scss";
import { Card, IconButton, Grid, duration } from "@mui/material";
import { PlayArrow, Pause, Delete } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/redux";
import {
  setActiveTrack,
  setPause,
  setPlay,
} from "@/store/reducers/playerSlice";
import { getServerStaticUrl } from "@/utils/functions/getServerStaticUrl";
import { deleteTrackThunk } from "@/store/thunks/trackThunk";
import { PlayerState } from "@/types/player";
import { getTimeFromPlayer } from "@/utils/functions/getTimeFromPlayer";

type TrackItemProps = {
  track: ITrack;
  active?: boolean;
  activeTrack?: PlayerState;
};

const TrackItem: React.FC<TrackItemProps> = ({
  track,
  active = false,
  activeTrack,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const play = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const isThisTrackPlay =
      JSON.stringify(track) === JSON.stringify(activeTrack?.active);
    e.stopPropagation();
    if (isThisTrackPlay && !activeTrack?.pause) {
      dispatch(setPause());
      return;
    } else if (isThisTrackPlay && activeTrack?.pause) {
      dispatch(setPlay());
      return;
    }
    dispatch(setActiveTrack(track));
    dispatch(setPlay());
  };
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(deleteTrackThunk(track._id));
  };
  return (
    <Card
      className={styles.track}
      onClick={() => router.push(`/tracks/${track._id}`)}
    >
      <IconButton onClick={play}>
        {active && !activeTrack?.pause ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img width={70} height={70} src={getServerStaticUrl(track.picture)} />
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: "gray" }}>{track.artist}</div>
      </Grid>
      {active && activeTrack && (
        <div>
          {getTimeFromPlayer(activeTrack.currentTime)} /{" "}
          {getTimeFromPlayer(activeTrack.duration)}
        </div>
      )}
      <IconButton onClick={handleDelete} style={{ marginLeft: "auto" }}>
        <Delete />
      </IconButton>
    </Card>
  );
};

export default React.memo(TrackItem);
