import React, { useState, ChangeEvent} from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import styles from "../../styles/GenInfo.module.css";
import { Container } from "@material-ui/core";
import { fchmod } from "fs";
import { GenInfoProps } from "../../types";

const GenInfo = ({
  globalBehaviors,
  behaviorId,
  setBehaviorId,
  updateBehavior,
}: GenInfoProps) => {
  const handleChange = (event: ChangeEvent<{ value: unknown}>) => {
    setBehaviorId(event.target.value as string);
    updateBehavior(event.target.value as string);
  };

  const [hide, setHide] = useState<boolean>(false);

  const doNotShow = (): void => {
    setHide(false);
  };
  const show = (): void => {
    setHide(true);
  };
  return (
    <div className={styles.container} style={{ minWidth: "400px" }}>
      <FormControl>
        <Select value={behaviorId} onChange={handleChange} displayEmpty>
          <MenuItem value="" disabled>
            Choose behavior
          </MenuItem>
          {globalBehaviors.map((behavior, idx) => (
            <MenuItem key={idx} value={behavior.id}>
              {behavior.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select Behavior Type</FormHelperText>
      </FormControl>

      {hide && (
        <MenuItem>
          <TextField
            className={styles.hide}
            id="standard-number"
            label="Number of Trials"
            type="number"
          />
        </MenuItem>
      )}
    </div>
  );
};

export default GenInfo;
