import React from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";
import Current from "../components/editProgram/Current";
import CheckUser  from '../auth0CheckUser';
import { EditProgramProps } from "../types";
import { QueryBuilderTwoTone } from "@material-ui/icons";

const editProgram = ({ studentID, program }: EditProgramProps) => {
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

export const getServerSideProps = async ({ query }): Promise<{ props: { studentID: EditProgramProps; program: EditProgramProps } }> => {
  const temp = await fetch(
    `/patient/program/${query.studentID}`
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
