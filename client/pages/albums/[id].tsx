import MainLayout from "@/layouts/MainLayout";
import React, { useState } from "react";
import { Button, Grid, TextField, Divider } from "@mui/material";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { albumsApi } from "@/queries/queries";
import { getServerStaticUrl } from "@/utils/functions/getServerStaticUrl";
import { useInput } from "@/hooks/useInput";
import { IAlbum } from "@/types/album";
import TrackList from "@/components/TrackList";

type AlbumPageProps = {
  album: IAlbum;
};

const TrackPage = ({ album }: AlbumPageProps) => {
  const router = useRouter();
  const username = useInput("");
  const text = useInput("");
  return (
    <MainLayout
      keywords={`Music, ${album.name}, ${album.author}`}
      title={"Music Platform - " + album.name + "-" + album.author}
    >
      <>
        <Button
          variant={"outlined"}
          className="btn"
          onClick={() => router.push("/albums")}
        >
          Go to List
        </Button>
        <Button
          variant={"outlined"}
          className="btn"
          style={{ marginLeft: "10px" }}
          onClick={() => router.push(`/albums/createtrack/${album._id}`)}
        >
          Create Track
        </Button>
        <Grid container style={{ margin: "20px 0" }}>
          <img
            src={getServerStaticUrl(album.picture)}
            width={200}
            height={200}
          />
          <div style={{ margin: "0 20px" }}>
            <h1>Track name - {album.name}</h1>
            <h1>Artist - {album.author}</h1>
          </div>
        </Grid>
        <h1>Tracks</h1>
        <TrackList tracks={album.tracks} />
      </>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id: string = typeof params?.id !== "string" ? "" : params.id;
  const data = await albumsApi.getOneAlbum(id);
  return {
    props: {
      album: data,
    },
  };
};
