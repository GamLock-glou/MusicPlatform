import React from "react";
import styles from "../../../styles/Progress/Progress.module.scss";
import { getTimeFromPlayer } from "@/utils/functions/getTimeFromPlayer";

type TrackProgressProps = {
  left: number;
  right: number;
  onChange: (e: any) => void;
  isTrack?: boolean;
};

export const TrackProgress: React.FC<TrackProgressProps> = ({
  left,
  right,
  isTrack = false,
  onChange,
}) => {
  return (
    <div className={styles.container}>
      <input
        min={0}
        max={right}
        value={left}
        onChange={onChange}
        type="range"
      />
      {isTrack ? (
        <div>
          {getTimeFromPlayer(left)} / {getTimeFromPlayer(right)}
        </div>
      ) : (
        <div>
          {left} / {right}
        </div>
      )}
    </div>
  );
};
