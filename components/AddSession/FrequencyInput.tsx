import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { FrequencyInputProps } from "../../types";

const FrequencyInput = ({title, entryNumber, setResponses}: FrequencyInputProps) => {
  const [counter, setCounter] = useState<number>(0);

  const displayCounter: boolean = counter > 0;

  const handleIncrement = (): void => {
    setCounter((prev: number) => prev + 1);
    if(typeof(setResponses) == "function") {
      setResponses(counter + 1, entryNumber);
    }
  };

  const handleDecrement = (): void => {
    setCounter((prev: number) => prev - 1);
    if(typeof(setResponses) == "function") {
      setResponses(counter + 1, entryNumber);
    }
  };

  return (
    <div>
      <p>{title}</p>
      <ButtonGroup size="small" aria-label="small outlined button group">
        {displayCounter && <Button onClick={handleDecrement}>-</Button>}
        {displayCounter && <Button disabled>{counter}</Button>}
        <Button onClick={handleIncrement}>+</Button>
      </ButtonGroup>
    </div>
  );
};

export default FrequencyInput;