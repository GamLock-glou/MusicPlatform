import { ITrack } from "@/types/track";
import React from "react";
import { Grid, Box } from "@mui/material";
import TrackItem from "./TrackItem";
import { useAppSelector } from "@/hooks/redux";

type TrackListProps = {
  tracks: ITrack[];
};

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  const activeTrack = useAppSelector((state) => state.playerReducer);
  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map((track) => {
          const isActive = activeTrack?.active?._id === track._id;
          return isActive ? (
            <TrackItem
              active={isActive}
              activeTrack={activeTrack}
              track={track}
              key={track._id}
            />
          ) : (
            <TrackItem active={false} track={track} key={track._id} />
          )}
        )}
      </Box>
    </Grid>
  );
};
export default React.memo(TrackList);
