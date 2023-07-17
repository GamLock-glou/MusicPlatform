import MainLayout from "@/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { Grid, Card, Button, Box, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getAlbumsThunk } from "@/store/thunks/albumThunk";
import AlbumList from "@/components/AlbumList";

const Index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAlbumsThunk())
  }, [dispatch])
  const {
    albums,
    error,
    isLoading,
  } = useAppSelector((state) => state.albumReducer);
  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }
  return (
    <MainLayout title={"List Albums - music platform"}>
      <Grid container justifyContent="center">
        <Card className="containerTrack">
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>List Albums</h1>
              <Button
                className="btnUpload"
                onClick={() => router.push("/albums/create")}
              >
                Upload
              </Button>
            </Grid>
          </Box>
          <AlbumList albums={albums} />
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default Index;
