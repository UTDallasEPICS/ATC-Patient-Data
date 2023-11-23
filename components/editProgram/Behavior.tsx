import React, {FC, useState} from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { BehaviorEditProgramProps } from "../../types";

const Behavior: FC<BehaviorEditProgramProps> = ({ list, studentId, updateBehaviorList }) => {
  const options = [
    {
      name: "Delete",
      onCall: (id) => {
        openDialog(id);
      },
    },
  ];

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [focusBehavior, setFocusBehavior] = useState<string>("");

  const closeDialog = () => {
    setDialogOpen(false);
    setFocusBehavior("");
  };

  const openDialog = (id: string) => {
    setDialogOpen(true);
    setFocusBehavior(id);
  };

  const removeBehavior = async (behaviorId: string) => {
    if (behaviorId == "" || !behaviorId) {
      console.log("No behavior ID");
      return;
    }
    try {
      await fetch(
        `http://localhost:8080/patient/program/${studentId}/delete/${behaviorId}`,
        {
          method: "delete",
          mode: "cors",
        }
      );
      updateBehaviorList((prev) =>
        [...prev].filter((behavior) => behavior.id !== behaviorId)
      );
    } catch (error) {
      console.log("Cannot delete behavior! Please try again later");
    }
  };

  return (
    <div>
      <>
        {list.map((behavior) => (
          <Accordion key={behavior.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Typography>{behavior.name} </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ width: "100%" }}>
                <Typography color="textSecondary" variant="body2">
                  Description: <br />
                  {behavior.description}
                  <br />
                  <br />
                </Typography>

                <Typography color="textSecondary" variant="body2">
                  Type: <br />
                  {behavior.datatype}
                </Typography>
                <div style={{ marginTop: "2rem" }}>
                  {options.map((option) => (
                    <Button
                      key={option.name}
                      onClick={() => {
                        option.onCall(behavior.id);
                      }}
                    >
                      {option.name}
                    </Button>
                  ))}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
        <Dialog
          open={dialogOpen}
          onClose={() => {
            closeDialog();
          }}
        >
          <DialogTitle>Remove this behavior?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove this behavior?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                closeDialog();
              }}
            >
              No
            </Button>
            <Button
              onClick={async () => {
                await removeBehavior(focusBehavior);
                closeDialog();
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
};

export default Behavior;
