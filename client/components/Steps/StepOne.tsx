import React from "react";
import { Grid, TextField } from "@mui/material";
import styles from "../../styles/Steps/StepOne.module.scss";
import { TUseInput, TUseInputReturn } from "@/hooks/useInput";
import { IStepOne } from "@/types/types";

type StepOneProps = {
  values: IStepOne[];
};

export const StepOne: React.FC<StepOneProps> = ({ values }) => {
  return (
    <Grid container direction="column" className={styles.container}>
      {values.map((v) =>
        v.multiline ? (
          <TextField
            key={v.text}
            {...v.value}
            className={styles.textField}
            label={v.text}
            multiline
            rows={3}
          />
        ) : (
          <TextField
            key={v.text}
            {...v.value}
            label={v.text}
            className={styles.textField}
          />
        )
      )}
    </Grid>
  );
};
