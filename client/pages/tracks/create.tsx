import StepWrapper from "@/components/StepWrapper";
import MainLayout from "@/layouts/MainLayout";
import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { StepOne } from "@/components/Steps/StepOne";
import { FileUpload } from "@/components/FileUpload/FileUpload";
import { TUseInputReturn, useInput } from "@/hooks/useInput";
import { IPostTrack } from "@/types/track";
import { tracksApi } from "@/queries/queries";
import { useRouter } from "next/router";
import { NextAndBackStepper } from "@/components/Stepper/NextAndBackStepper";
import { IStepOne } from "@/types/types";
import Image from "next/image";

const steps = ["Information about track", "Upload the cover", "Upload audio"];
const Create = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [srcPicture, setSrcPicture] = useState<string>("");
  const [picture, setPicture] = useState<File>();
  const [audio, setAudio] = useState<File>();
  const name: TUseInputReturn = useInput("");
  const artist: TUseInputReturn = useInput("");
  const text: TUseInputReturn = useInput("");
  const arrayValuesStepOne: IStepOne[] = [
    { value: name, text: "Track name", multiline: false },
    { value: artist, text: "Artist name", multiline: false },
    { value: text, text: "Text track", multiline: true },
  ];
  const handleNext = () => {
    if (steps.length - 1 !== activeStep) {
      setActiveStep((pr) => pr + 1);
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("text", text.value);
      formData.append("artist", artist.value);
      formData.append("picture", picture || '');
      formData.append("audio", audio || '');
      tracksApi
        .createTrack(formData)
        .then((resp) => router.push("/tracks"))
        .catch((error) => console.log(error));
    }
  };
  const handleBack = () => {
    setActiveStep((pr) => pr - 1);
  };
  return (
    <MainLayout>
      <StepWrapper steps={steps} activeStep={activeStep}>
        <>
          {activeStep === 0 && <StepOne values={arrayValuesStepOne} />}
          {activeStep === 1 && (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              marginTop={3}
            >
              {srcPicture ? (
                <Image
                  src={srcPicture}
                  width={200}
                  height={200}
                  alt="Picture of the author"
                />
              ) : (<Grid style={{background: 'gray'}} width={200} height={200} />)}
              <FileUpload
                accept="image/*"
                setFile={setPicture}
                setSrcPicture={setSrcPicture}
              >
                <Button className="btnUpload">Upload the cover</Button>
              </FileUpload>
            </Grid>
          )}
          {activeStep === 2 && (
            <Grid
              container
              direction='column'
              justifyContent="center"
              alignItems="center"
              marginTop={3}
            >
              {audio?.name && <div>{audio?.name}</div>}
              <FileUpload accept="audio/*" setFile={setAudio}>
                <Button className="btnUpload">Upload audio</Button>
              </FileUpload>
            </Grid>
          )}
        </>
      </StepWrapper>
      <NextAndBackStepper
        activeStep={activeStep}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </MainLayout>
  );
};

export default Create;
