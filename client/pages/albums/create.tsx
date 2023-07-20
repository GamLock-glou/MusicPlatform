import StepWrapper from "@/components/StepWrapper";
import MainLayout from "@/layouts/MainLayout";
import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import { StepOne } from "@/components/Steps/StepOne";
import { FileUpload } from "@/components/FileUpload/FileUpload";
import { TUseInputReturn, useInput } from "@/hooks/useInput";
import { albumsApi } from "@/queries/queries";
import { useRouter } from "next/router";
import { NextAndBackStepper } from "@/components/Stepper/NextAndBackStepper";
import { IStepOne } from "@/types/types";
import Image from "next/image";

const steps = ["Information about album", "Upload the cover"];
const Create = () => {
  const router = useRouter();
  const [srcPicture, setSrcPicture] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [picture, setPicture] = useState<File>();
  const name: TUseInputReturn = useInput("");
  const author: TUseInputReturn = useInput("");
  const arrayValuesStepOne: IStepOne[] = [
    { value: name, text: "Album name", multiline: false },
    { value: author, text: "Author name", multiline: false },
  ];
  const handleNext = () => {
    if (steps.length - 1 !== activeStep) {
      setActiveStep((pr) => pr + 1);
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("author", author.value);
      formData.append("picture", picture || "");
      albumsApi
        .createAlbum(formData)
        .then((resp) => router.push("/albums"))
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
            <Grid container justifyContent="center" alignItems='center' marginTop={3}>
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
