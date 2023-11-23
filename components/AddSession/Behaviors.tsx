import React, { FC } from "react";
import Behavior from "./Behavior";
import { BehaviorsProps } from "../../types";
 
const Behaviors: FC<BehaviorsProps> = ({ behaviors, returnResponses}) => {
  let responseArray: any[] = [];
  for (var i = 0; i < behaviors.length; i++)
  {
      responseArray[i] = [];
  }
  const fillData = (behaviorCount: number, response: any) =>
  {
      responseArray[behaviorCount] = response;
      if(typeof(returnResponses) == "function") {
        returnResponses(responseArray);
      }
  }

  return (
    <div>
      {behaviors.map(( behavior, i ) => (
        <Behavior behaviorCount={i} data={behavior} returnData={fillData}/>
      ))}
    </div>
  );
} 