import MainLayout from "@/layouts/MainLayout";
import React, { useState } from "react";
import { Button, Grid, TextField, Divider } from "@mui/material";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { commentsApi, tracksApi } from "@/queries/queries";
import { IPostComment, ITrack } from "@/types/track";
import { getServerStaticUrl } from "@/utils/functions/getServerStaticUrl";
import { useInput } from "@/hooks/useInput";

type TrackPageProps = {
  serverTrack: ITrack;
};

const TrackPage = ({ serverTrack }: TrackPageProps) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();
  const username = useInput("");
  const text = useInput("");
  const addComment = async () => {
    try {
      const comment: IPostComment = {
        username: username.value,
        text: text.value,
        trackId: track._id,
      };
      const response = await commentsApi.createComment(comment);
      if (response.status === 201 || response.status === 200) {
        setTrack({ ...track, comments: [...track.comments, response.data] });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <MainLayout
      keywords={`Music, ${track.name}, ${track.artist}`}
      title={"Music Platform - " + track.name + "-" + track.artist}
    >
      <>
        <Button
          variant={"outlined"}
          className="btn"
          onClick={() => router.push("/tracks")}
        >
          Go to List
        </Button>
        <Grid container style={{ margin: "20px 0" }}>
          <img
            src={getServerStaticUrl(track.picture)}
            width={200}
            height={200}
          />
          <div style={{ margin: "0 20px" }}>
            <h1>Track name - {track.name}</h1>
            <h1>Artist - {track.artist}</h1>
            <h1>Auditions - {track.listens}</h1>
            {track.albumId && (
              <p onClick={() => router.push(`/albums/${track.albumId}`)}>
                Check album
              </p>
            )}
          </div>
        </Grid>
        <h1>Text in track</h1>
        <p>{track.text}</p>
        <Divider />
        <h1>Comments</h1>
        <Grid container direction="column">
          <TextField {...username} label="UserName" fullWidth />
          <TextField {...text} label="Comment" fullWidth multiline rows={4} />
          <Button onClick={addComment} className="btnUpload">
            Send
          </Button>
          <Divider />
          <div>
            {track.comments.map((comment) => (
              <div key={comment._id}>
                <div>
                  <div>Author - {comment.username}</div>
                  <div>Comment - {comment.text}</div>
                </div>
              </div>
            ))}
          </div>
        </Grid>
      </>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id: string = typeof params?.id !== "string" ? "" : params.id;
  const data = await tracksApi.getOneTack(id);
  return {
    props: {
      serverTrack: data,
    },
  };
};
