import MainLayout from "@/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { Grid, Card, Button, Box, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { ITrack, TrackState } from "@/types/track";
import TrackList from "@/components/TrackList";
import { NextThunkDispatch, wrapper } from "@/store";
import { getTracksThunk, searchTracksThunk } from "@/store/thunks/trackThunk";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Search } from "@/components/Search/Search";

const Index = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTracksThunk())
  }, [dispatch]);
  const router = useRouter();
  const {
    tracks,
    error,
    isLoading,
  } = useAppSelector((state) => state.trackReducer);
  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }
  return (
    <MainLayout title={"List Tracks - music platform"}>
      <Grid container justifyContent="center" marginBottom={5}>
        <Card className="containerTrack">
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>List Tracks</h1>
              <Button
                className="btnUpload"
                onClick={() => router.push("/tracks/create")}
              >
                Upload
              </Button>
            </Grid>
          </Box>
          <Search param="tracks" />
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;