import React from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Current from "../components/editProgram/Current";
import CheckUser  from '../auth0CheckUser';

const editProgram = ({ studentID, program }) => {
  const {allowed, role} = CheckUser(["Admin", "BCBA"])
  if(!allowed) return(<div>Redirecting...</div>);

  return (
    <div>
      <Head>
        <title>Edit Program</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>
      <Navbar pageTitle="Edit Program" role={role}>
        <Current addedBehavior={program.behaviours} studentID={studentID} />
      </Navbar>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const temp = await fetch(
    `${process.env.AUTH0_BASE_URL}/patient/program/${query.studentID}`
  );
  const { data } = await temp.json();
  return {
    props: {
      studentID: query.studentID,
      program: data[0],
    },
  };
};

export default editProgram;
