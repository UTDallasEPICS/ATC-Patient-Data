import Navbar from "../../components/Navbar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import styles from "../../styles/AddSession.module.css";
import { Behaviors } from "../../components/AddSession/Behaviors";
import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';

import React from "react";
import { useState, useEffect } from "react";


//Takes behaviour data from a student's unique program and sends it to components/AddSession/behaviors to load onto session page

interface Behavior {
  name: string;
  description: string;
  datatype: string;
  trialsPerEntry: number;
  entries: string[];
  tags: string[];
}

interface ProgramAsProps
{
  studentID: string;
  studentName: string;
  behavior: Behavior[];
  responses: string[];
}

const addSession = ({ studentID_, firstName, lastName, patient, employee, behavior, program}) => {
  const [session, setSession] = useState(null)
    const [employeeList, setSession] = useState([]);
    // fetch data from client side
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/session`, { method: 'GET' });
                if (response.ok) {
                    const data = await response.json();
                    setSession(data);
                } else {
                    console.error('Failed to fetch data:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

  //Create an array of behaviors
  const behaviors = program.behaviors;
  const [behaviorList] = useState<Behavior[]>(
    behaviors.map((behavior: Behavior) => ({
        title: behavior.name,
        description: behavior.description,
        datatype: behavior.datatype,
        trialsPerEntry: 5, //Needs change once backend 'behavior' has necessary components
        entries: ["Trial #1", "Trial #2"], //Needs change once backend 'behavior' has necessary components
        tags: [], //Needs change once backend 'behavior' has necessary components
    }))
  );

  interface Probe //object for JSON conversion
  {
      successes: number;
      failures: number;
  }
  interface Duration //object for JSON conversion
  {
      seconds: number;
  }
  interface Frequency //object for JSON conversion
  {
      occurences: number;
  }
  interface Trial //object for JSON conversion
  {
      value: boolean;
  }

  //Takes array for a probe and returns an object for JSON conversion
  function getProbe(results: any)
  {
      let success = 0;
      let fails = 0;
      for(var i = 0; i < results.length; i++)
      {
          if(results[i] == "+")
          {
            success++;
          }
          else if(results[i] == "-")
          {
              fails++;
          }
      }
      
      const newProbe: Probe = {successes: success, failures: fails}
      return newProbe;
  }

  //Takes array for a trial and returns an object for JSON conversion
  function getTrial(result: any)
  {
    let score = false;
    if(result[0] == "+")
    {
      score = true;
    }
    else if(result[0] == "-")
    {
      score = false;
    }

    const newTrial: Trial = {value: score};
    return newTrial;
  }

  //All data for a session
  const programData: ProgramAsProps = 
  {
      studentID: studentID_,
      studentName: firstName + " " + lastName,
      behavior: behaviorList,
      responses: [],
  };

  //Converts all response data into JSON
  const convertToJSON = (responses: any) =>
  {
      for(var i = 0; i < responses.length; i++)
      {
          if(programData.behavior[i].datatype == "duration")
          {
              for(var j = 0; j < programData.behavior[i].entries.length; j++)
              {
                const newDuration: Duration = {seconds: responses[i][j]};
                responses[i][j] = newDuration;
              }
          }
          else if(programData.behavior[i].datatype == "frequency")
          {
              for(var j = 0; j < programData.behavior[i].entries.length; j++)
              {
                const newFrequency: Frequency = {occurences: responses[i][j]};
                responses[i][j] = newFrequency;
              }
          }
          else if(programData.behavior[i].datatype == "probe")
          {
              for(var j = 0; j < programData.behavior[i].entries.length; j++)
              {
                  const newProbe: Probe = getProbe(responses[i][j]);
                  responses[i][j] = newProbe;
              }
          }
          else if(programData.behavior[i].datatype == "trial")
          {
              for(var j = 0; j < programData.behavior[i].entries.length; j++)
              {
                  const newTrial: Trial = getTrial(responses[i][j]);
                  responses[i][j] = newTrial;
              }
          }
      }
      return responses;
  }

  //Get response data from componenents/AddSession/Behaviors
  const getResponses = (responseArray: any) =>
  {
      programData.responses = responseArray;
      console.log(programData.responses);
  }

  const submitSession = async () => {
    const reportPostResponse = await fetch('/report/', {
      method: "post",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionTime: new Date(),
        data: convertToJSON(programData.responses),
        patient,
        employee,
        behaviors,
      }),
    })
    const reportPostData = await reportPostResponse.json();
    const reportId = reportPostData['data'];
    console.log(reportId)

    const reportResponse = await fetch('/report/' + reportId)
    const reportData = await reportResponse.json();
    const report = reportData['data'];
    console.log(report)

    const patientResponse = await fetch(`/patient/${patient._id}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        reports: [...patient["reports"], report],
      }),
    })

    const patientData = await patientResponse.json();
    console.log(patientData)
  }

  return (
    <div>
      <Container className={styles.container}>
        <Behaviors behaviors={programData.behavior} returnResponses={getResponses} />
        <Link href={`/student/profile?id=${studentID_}`} >
          <Button
              variant="contained"
              color="inherit"
              className="primaryButton"
              style={{ width: "20vh", margin: "auto", marginBottom: "80px" }}
              onClick={submitSession}
            >
              Submit Session
            </Button>
        </Link>
      </Container>
    </div>
  ); 


};
const router = useRouter();
const {studentId} = router.query
const [patientData, setPatientData] = useState<Behavior | null>(null)

    useEffect(() => {
      const fetchData = async () => {
        // TODO: if behavior id is zero, then we dont need to do a network request
        // we can just make an empty behavior (with any sensible defaults)
        if(studentId == "0"){
          setPatientData(null);
        }
        else{
          try {
            const response = await fetch(`/api/behavior?id=${studentId}`, { method: 'PUT' });
            if (response.ok) {
                const data: Behavior = await response.json();
                setPatientData(data);
            } else {
                console.error('Failed to fetch data:', response.status, response.statusText);
            }
          } catch (error) {
              console.error('Error fetching data:', error);
          }
        }
      };
      fetchData();
    }, [studentId]);

   const employeeRes = await fetch(
    `/employee/64518555b5b62f1086e74d80`
  );
  const employeeData = await employeeRes.json();

  const programRes = await fetch(
    `/patient/program/${query.studentID}`
  );
  const programData = await programRes.json();

  return {
    props: {
      studentID_: query.studentID,
      firstName: query.firstName,
      lastName: query.lastName,
      patient: patientData['data'],
      employee: employeeData['data'],
      behaviors: programData['data'][0]["behaviors"],
      program: programData['data'][0],
    },
  };
};
const convertStringToDate = (date: string) => {
  const data = date.split("-");
  return new Date(
      parseInt(data[0]),
      parseInt(data[1]) - 1,
      parseInt(data[2])
  );
};

export default addSession;