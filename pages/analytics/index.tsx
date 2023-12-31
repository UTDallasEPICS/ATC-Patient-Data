import Navbar from "../../components/Navbar";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import styles from "../../styles/Analytics.module.css";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Graphs from "../../components/Analytics/Graphs/Graphs";
import Reports from "../../components/Analytics/Reports/Reports";
import CheckUser from "../../auth0CheckUser";
import { IndexProps } from "../../types";

const analytics = ({ patient, reports }: IndexProps) => {
  // Verifies if user has the correct permissions
  const {allowed, role} = CheckUser(["Admin", "BCBA", "Technician", "Guardian"])
  if(!allowed) return(<div>Redirecting...</div>);

  const [page, setPage] = useState<number>(0);

  const handlePageChange = (event: any, newValue: any) => {
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const studentID = query.studentID;

  const patientRes = await fetch(
    `/patient/${query.studentID}`
  );
  const patientData = await patientRes.json(); 

  let reports = []
  for(const reportID of patientData['data']['reports']) {
    const response = await fetch(`/report/${reportID}`)
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
};

export default analytics;
