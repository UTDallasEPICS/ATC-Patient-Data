import React, { useState } from "react";
import useSWR from 'swr'

const editProgram = ({ patient, employee, behaviors }) => {
  console.log(patient);
  console.log(employee);
  console.log(behaviors);
  var reportId = null;
  var report = null;

  const [ID, setID] = React.useState('')
  const onChange = (event) => {
    console.log(event.target.value)
    setID(event.target.value)
  }

  const handleClick = async () => {
    
    const response = await fetch('${process.env.BASE_URL}/report/', {
      method: "post",
      mode: "cors",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionTime: new Date(),
        data: "fart",
        patient,
        employee,
        behaviors,
      }),
    })
    const {data} = await response.json();
    reportId = data;
    console.log(data)
  }

  const updateUser = async () => {
    console.log(patient._id)
    const response = await fetch(`${process.env.BASE_URL}/patient/${patient._id}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        reports: [...patient["reports"], report],
      }),
    })

    const data = await response.json();
    console.log(data)
  }

  const getReport = async () => {
    const response = await fetch('${process.env.BASE_URL}/report/' + reportId)
    const {data} = await response.json();
    report = data;
    console.log(data)
  }

  const getStudentReports = async () => {
    let studentReports = []
    for(const reportID of patient['reports']) {
      const response = await fetch(`${process.env.BASE_URL}/report/${reportID}`)
      const {data} = await response.json();
      studentReports.push(data)
    }
    console.log(studentReports)
  }

  const deleteReport = async () => {
    const updatedReports = []
    patient['reports'].forEach((reportID) => {
      if (reportID !== ID) updatedReports.push(reportID)
    })
    console.log(updatedReports)
    const response = await fetch(`${process.env.BASE_URL}/patient/${patient._id}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        reports: updatedReports,
      }),
    })

    const data = await response.json();
    console.log(data)
  }



  return (
    <div>

      <button onClick={async() => {
        const employeeRes = await fetch(
          `${process.env.BASE_URL}/employee`
        );
        
        const employeeData = await employeeRes.json();
      
        console.log(employeeData["data"]) 
      }} >
        get employees
      </button>

      <button onClick={handleClick}>
        add session
      </button>

      <button onClick={getReport}>
        get report
      </button>

      <button onClick={updateUser}>
        update user
      </button>

      <button onClick={getStudentReports}>
        getStudentReports
      </button>

      <input onChange={onChange}></input>
      <button onClick={deleteReport} > Delete ID </button>

      {/* {studentID} */}
    </div>
  );
};

// DO NOT TOUCH FILE UNTIL LAB THEN ASK TAZ

export const getServerSideProps = async ({ query }) => { // ask Taz
  const patientRes = await fetch(
    `${process.env.BASE_URL}/patient/${query.studentID}`
  );
  const patientData = await patientRes.json(); 

  const employeeRes = await fetch(
    `${process.env.BASE_URL}/employee/64518555b5b62f1086e74d80`
  );
  const employeeData = await employeeRes.json();

  const programRes = await fetch(
    `${process.env.BASE_URL}/patient/program/${query.studentID}`
  );
  const programData = await programRes.json();

  return {
    props: { // props passes data into the component that was mounted
      patient: patientData['data'], // all of these lines of code happen in one line
      employee: employeeData['data'],
      behaviors: programData['data'][0]["behaviours"],
    },
  };
};


 
const fetcher = (...args) => fetch(...args).then((res) => res.json())
 
function Profile() {
  const { data, error } = useSWR('/api/profile-data', fetcher) // fetcher is created 
 
  if (error) return <div>Failed to load</div> // if you don't load
  if (!data) return <div>Loading...</div> // if data hasn't been completely loaded yet
 
  const patientRes = await fetch(
    `${process.env.BASE_URL}/patient/${query.studentID}`
  );
  const patientData = await patientRes.json(); 

  const employeeRes = await fetch(
    `${process.env.BASE_URL}/employee/64518555b5b62f1086e74d80`
  );
  const employeeData = await employeeRes.json();

  const programRes = await fetch(
    `${process.env.BASE_URL}/patient/program/${query.studentID}`
  );
  const programData = await programRes.json();



  return ( // ignore the html tags
    <div> 
      
    </div>
  )
}


export default editProgram; // DO NOT DELETE THIS SAMUEL