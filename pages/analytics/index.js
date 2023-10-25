import Navbar from "../../components/Navbar";
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../../styles/Analytics.module.css";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Graphs from "../../components/Analytics/Graphs/Graphs";
import Reports from "../../components/Analytics/Reports/Reports";
import CheckUser from "../../auth0CheckUser";
import ReactDOM from "react-dom/client";

const analytics = ({ patient, reports }) => {
  // Verifies if user has the correct permissions
  const {allowed, role} = CheckUser(["Admin", "BCBA", "Technician", "Guardian"])
  if(!allowed) return(<div>Redirecting...</div>);

  const [page, setPage] = useState(0);

  const handlePageChange = (event, newValue) => {
    console.log(newValue);
    setPage(newValue);
  };

  return (
    <div>
      <Head>
        <title>Analytics</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>

      <Navbar pageTitle="Analytics" role={role} analytics>
        <div>
          <Paper square>
            <Tabs
              value={page}
              onChange={handlePageChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Graphs" />
              <Tab label="Reports" />
            </Tabs>
          </Paper>
        </div>

        {page === 0 ? (
          <Graphs studentID={patient._id} />
        ) : (
          <Reports reports={reports} />
        )}
      </Navbar>
    </div>
  );
};

/* export const getServerSideProps = async ({ query }) => { // CONVERT TO CLIENT SIDE
  const studentID = query.studentID;

  const patientRes = await fetch(
    `${process.env.BASE_URL}/patient/${query.studentID}`
  );
  const patientData = await patientRes.json(); 

  let reports = []
  for(const reportID of patientData['data']['reports']) {
    const response = await fetch(`${process.env.BASE_URL}/report/${reportID}`)
    const {data} = await response.json();
    reports.push(data)
  }
  console.log(reports)

  return {
    props: {
      patient: patientData['data'],
      reports: reports,
    },
  };
}; */

// WRITE NEW CODE HERE
/* export default function getStudentProfileClientSide({ patient, reports }) { // Ask Taz about this
  // State to store patient and reports data
  const [patientData, setPatientData] = useState(patient);
  const [reportsData, setReportsData] = useState(reports);

  // Effect to fetch data when the component is mounted
  useEffect(() => {
    async function fetchData() {
      try {
        const patientRes = await fetch(
          `${process.env.BASE_URL}/patient/${query.studentID}`
        ); // grab URL
        const patientData = await patientRes.json();
        let newReports = [];
        for (const reportID of patientData['data']['reports']) { 
          const response = await fetch(`${process.env.BASE_URL}/report/${reportID}`);
          const { data } = await response.json();
          newReports.push(data);
        }

        setPatientData(patientData['data']);
        setReportsData(newReports);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  return { // Do I need props here?
    patient: patientData['data'], 
      reports: reports,
  }
}  */


export default analytics;
