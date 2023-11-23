import Stopwatch from "./Stopwatch/Stopwatch";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import styles from "../../styles/AddSession.module.css";
import React, { useState, useEffect } from "react";
import { DurationInputProps} from '../../types';

const DurationInput: React.FC<DurationInputProps> = ({title, entryNumber, setResponses}) => {
  let time: number = 0;
  const getTime = (time: number) =>
  {
      time = time;
      if(typeof(setResponses) == "function") {
        setResponses((time / 1000), entryNumber);
      }
  }

  return (
    <div>
      <div
        style={{ display: "table", margin: "auto", marginTop: "20px" }}
      >
        <p>{title}</p>
        <Stopwatch getTime={getTime}/>
      </div>
    </div>
  );
};

export default DurationInput;