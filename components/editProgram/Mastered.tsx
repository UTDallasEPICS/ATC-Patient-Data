import React, { useEffect, useState } from 'react'
import Behavior from "./Behavior";
import { BehaviorItem, MasteredProps } from '../../types';



const Mastered = ( { studentID }: MasteredProps) => {
    
    const [behavior, setBehavior] = useState<BehaviorItem[]>([]);
  
    useEffect((): void => {
      setBehavior([
        {
          id: 0,
          name: "Touch Toes",
          description: "Test if client is able to touch toes",
          type: "Trial",
          domain: ["Behaviors for Increase"],
          masteryCriteria: "5 consecutive days passed.",
          mastered: false,
        },
        {
          id: 1,
          name: "Punching",
          description:
            "If student punches anyone",
          type: "frequency",
          domain: ["Behaviors for decrease"],
          masteryCriteria: "2 consecutive days passed.",
          mastered: false,
        },
        {
          id: 2,
          name: "Responding to Name",
          description: "Reacts when name is called",
          type: "probe",
          domain: ["Listener Reponding"],
          masteryCriteria: "10 Sessions Passed",
          mastered: true,
        },
      ]);
    }, []);
    return (
        <div>
            <Behavior list={behavior} studentId={0} updateBehaviorList={function (updatedlist: any): void {
          throw new Error('Function not implemented.');
        } } />
        </div>
    )
}

export default Mastered;

