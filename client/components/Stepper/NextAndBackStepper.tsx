import { Button, Grid } from "@mui/material";
import React from "react";

type NextAndBackStepperProps = {
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
};

export const NextAndBackStepper: React.FC<NextAndBackStepperProps> = ({
  activeStep,
  handleBack,
  handleNext,
}) => {
  return (
    <Grid container justifyContent="center">
      <Grid container justifyContent="space-between" width={600}>
        <Button
          disabled={activeStep === 0}
          className="btnUpload"
          onClick={handleBack}
        >
          Back
        </Button>
        <Button className="btnUpload" onClick={handleNext}>
          Next
        </Button>
      </Grid>
    </Grid>
  );
};
