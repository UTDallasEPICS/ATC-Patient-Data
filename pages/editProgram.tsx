import React from "react";
import Current from "../components/editProgram/Current";
import { EditProgramProps } from "../types";
import { QueryBuilderTwoTone } from "@material-ui/icons";

const editProgram = () => {
  return (
    <div>
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
