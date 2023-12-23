import React, { FC, ChangeEvent } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Paper,
} from "@material-ui/core";
import styles from "../../styles/EditProgram.module.css";

interface Behavior {
  name: string;
  description: string;
  datatype: string;
}

interface BehaviorDialogFormProps {
  behavior: Behavior;
  setBehavior: (behavior: Behavior) => void;
}

const BehaviorDialogForm: FC<BehaviorDialogFormProps> = ({ behavior, setBehavior }) => {
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBehavior({
      ...behavior,
      name: e.target.value,
    });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBehavior({
      ...behavior,
      description: e.target.value,
    });
  };

  const handleDataTypeChange = (e: ChangeEvent<{ value: unknown }>) => {
    setBehavior((prev) => ({
      ...prev,
      datatype: e.target.value as string,
    }));
  };

  return (
    <Paper className={styles.domainPaper}>
      <FormControl fullWidth>
        <InputLabel htmlFor="name-input">Behavior Name</InputLabel>
        <Input
          id="name-input"
          aria-describedby="name-helper-text"
          value={behavior.name}
          onChange={handleNameChange}
        />
        <FormHelperText id="name-helper-text">
          Enter the name of your behavior here
        </FormHelperText>
      </FormControl>
      <FormControl
        fullWidth
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        <InputLabel htmlFor="description-input">Behavior Description</InputLabel>
        <Input
          id="description-input"
          aria-describedby="description-helper-text"
          value={behavior.description}
          onChange={handleDescriptionChange}
        />
        <FormHelperText id="description-helper-text">
          Enter the description of your behavior here
        </FormHelperText>
      </FormControl>
      <FormControl fullWidth style={{ marginBottom: "1rem" }}>
        <InputLabel id="datatype-select-label">Behavior Type</InputLabel>
        <Select
          labelId="datatype-select-label"
          id="datatype-select"
          value={behavior.datatype}
          onChange={handleDataTypeChange}
        >
          <MenuItem value="" disabled>
            Choose a behavior type
          </MenuItem>
          <MenuItem value="trial">Trial</MenuItem>
          <MenuItem value="probe">Probe</MenuItem>
          <MenuItem value="duration">Duration</MenuItem>
          <MenuItem value="frequency">Frequency</MenuItem>
        </Select>
        <FormHelperText id="datatype-helper-text">
          Choose a behavior type
        </FormHelperText>
      </FormControl>
    </Paper>
  );
}

export default BehaviorDialogForm;
