import React, { useEffect } from "react";
import { IconButton, Grid } from "@mui/material";
import { PlayArrow, Pause, Delete, VolumeUp } from "@mui/icons-material";
import styles from "../../styles/Player/Player.module.scss";
import { TrackProgress } from "./Progress/Progress";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  setCurrentTime,
  setDuration,
  setPause,
  setPlay,
  setVolume,
} from "@/store/reducers/playerSlice";
import { getServerStaticUrl } from "@/utils/functions/getServerStaticUrl";

let audio: HTMLAudioElement | null = null;

export const Player = () => {
  const { active, pause, volume, duration, currentTime } = useAppSelector(
    (state) => state.playerReducer
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    }
    setAudio();
    if(!pause) {
      audio.play();
    }
  }, [active]);
  useEffect(() => {
    if(pause && audio) {
      audio.pause();
    } else if (!pause && audio) {
      audio.play();
    }
  }, [pause])
  const setAudio = () => {
    if (audio && active) {
      audio.src = getServerStaticUrl(active.audio);
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        if (audio) {
          dispatch(setDuration(Math.ceil(audio.duration)));
        }
      };
      audio.ontimeupdate = () => {
        if (audio) {
          dispatch(setCurrentTime(Math.ceil(audio.currentTime)));
        }
      };
    }
  };
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audio) {
      audio.volume = Number(e.target.value) / 100;
    }
    dispatch(setVolume(Number(e.target.value)));
  };
  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audio) {
      audio.currentTime = Number(e.target.value);
    }
    dispatch(setCurrentTime(Number(e.target.value)));
  };
  const handlePlayer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!pause) {
      dispatch(setPause());
      audio?.pause();
      return;
    }
    dispatch(setPlay());
    audio?.play();
  };
  if(!active) {
    return null
  }
  return (
    <div className={styles.player}>
      <IconButton onClick={handlePlayer}>
        {pause ? <PlayArrow /> : <Pause />}
      </IconButton>
      <Grid container direction="column" className={styles.infoContainer}>
        <div>{active?.name}</div>
        <div className={styles.artist}>{active?.artist}</div>
      </Grid>
      <TrackProgress
        left={currentTime}
        right={duration}
        isTrack={true}
        onChange={changeCurrentTime}
      />
      <VolumeUp className={styles.volumeUp} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  );
};
