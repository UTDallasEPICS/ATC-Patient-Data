import React, { useState, useEffect} from "react";
import Head from "next/head";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import styles from "../../styles/EditProgram.module.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import GenInfo from "./GenInfo";
import DomainInput from "./DomainInput";
import Master from "./Mastery";
import Behavior from "./Behavior";
import BehaviorDialogForm from "./BehaviorDialogForm";
import { CurrentProps } from "../../types";

const Current = ({ studentID, addedBehavior }: CurrentProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps: string[] = getSteps();

  const [globalBehavior, setGlobalBehavior] = useState<any[]>([]);
  const [behavior, setBehavior] = useState<any[]>([]);
  const [behaviorId, setBehaviorId] = useState<string>("");
  const [currentBehavior, setCurrentBehavior] = useState<any>(null);

  useEffect((): void => {
    async function getBehaviors() {
      const temp = await fetch("http://localhost:8080/behaviour", {
        method: "get",
      });
      const { data } = await temp.json();
      setGlobalBehavior(data);
      setBehavior(addedBehavior);
      setLoading(false);
    }
    getBehaviors();
  }, []);

  //Handling if we need set trials
  const handleClickOpen = (): void => {
    setOpen(true);
  };
  //Handling when we do not need to set trial amount
  const handleClose = (): void => {
    setOpen(false);
  };

  const saveProgram = async (): Promise<void> => {
    const payload = {
      ...currentBehavior,
      studentId: studentID,
    };

    try {
      const temp = await fetch("http://localhost:8080/program", {
        method: "post",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data } = await temp.json();
      setBehavior(data.behaviours);
    } catch (error) {
      console.error(
        "Failed to add behavior to program! Please try again later"
      );
    }
  };

  //Function for  the stepper
  const handleNext = async (): Promise<void> => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep + 1 === steps.length) {
      setActiveStep(0);
      await saveProgram();
      handleClose();
    }
  };
  //Allows the stepper to go back
  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  //Gets the steps for the stepper
  function getSteps(): string[] {
    return ["General Info", "Domain"];
  }

  //Returns the components corresponding to the step the user is on.
  function getStepContent(stepIndex: number): JSX.Element | string {
    switch (stepIndex) {
      case 0:
        return (
          <GenInfo
            globalBehavior={globalBehavior}
            behaviorId={behaviorId}
            setBehaviorId={setBehaviorId}
            updateBehavior={(idx: string) => {
              setCurrentBehavior(
                globalBehavior.find((behavior) => behavior._id === idx)
              );
            }}
          />
        );
      case 1:
        return (
          <BehaviorDialogForm
            behavior={currentBehavior}
            setBehavior={setCurrentBehavior}
          />
        );
      default:
        return "Unknown stepIndex";
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Behavior
        list={behavior}
        studentId={studentID}
        updateBehaviorList={setBehavior}
      />

      <div className={styles.addButton}>
        <Fab
          aria-label="add"
          onClick={handleClickOpen}
          className="primaryButton"
        >
          <AddIcon />
        </Fab>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Create Behavior"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <></>
              ) : (
                <div>
                  <Typography>{getStepContent(activeStep)}</Typography>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className=""
                    >
                      Back
                    </Button>
                    <Button className="primaryColor" onClick={handleNext}>
                      {activeStep === steps.length - 1 ? "Save" : "Next"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default Current;
