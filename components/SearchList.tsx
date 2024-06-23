import React, { useState } from "react";
import PropTypes from "prop-types";
import StudentListItem from "./searchListItem";
import styles from "../styles/SearchList.module.css";
import { Student, SearchListProps } from "../types";

const SearchList = ({
  searchResults,
  searchTerm,
  destinationPath,
}: SearchListProps) => {
  return (
    <div
      className={styles.studentList}
      style={
        searchResults?.length > 7
          ? { overflowY: "scroll", maxHeight: "60vh" }
          : {}
      }
    >
      {searchResults
        ?.filter((student) => {
          if (searchTerm == "") {
            return student;
          } else if (
            (student.firstName + " " + student.lastName)
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ) {
            return student;
          }
        })
        .map((student) => (
          <StudentListItem
            key={student.id}
            firstName={student.User.firstName}
            lastName={student.lastName}
            id={student.id}
            img={student.img}
            destinationPath={destinationPath}
          />
        ))}
    </div>
  );
};

SearchList.propTypes = {
  searchResults: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
  destinationPath: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default SearchList;
