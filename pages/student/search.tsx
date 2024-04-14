import styles from "../../styles/SearchList.module.css";
import Link from "next/link";
import SearchList from "../../components/SearchList";
import { useEffect, useState } from "react";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

import { StudentSearchProps, Student } from "../../types";

// import theme from '../src/theme';

// // Issue I am having
// //Server Error
// TypeError: Failed to parse URL from /api/search/user
// This error happened while generating the page. Any console logs will be displayed in the terminal window.

import { green } from "@material-ui/core/colors";

// import {
//   fade,
//   ThemeProvider,
//   withStyles,
//   makeStyles,
//   createTheme,
// } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: green,
  },
});

export default function studentSearch () { // destructure
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/search/user', {
        method: "POST",
      })
      const data = await response.json()
      if(data.error) {
          console.log(data.error)
          return;
       }
      data?.results.sort(function (a: Student, b: Student) {
          const aName = a.firstName + a.lastName;
          const bName = b.firstName + b.lastName;
          if (aName < bName) {
              return -1;
          }
          if (aName > bName) {
              return 1;
          }
          return 0;
      })
      setStudents(data);
    }
    fetchData()
  }, []);


  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className={styles.searchPage}>
      <FormControl>
        <TextField
          className={styles.searchBox}
          id='outlined-basic'
          label='Student Search'
          variant='outlined'
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </FormControl>

      <div>
        <SearchList
          searchResults={students}
          searchTerm={searchTerm}
          destinationPath='/student/profile'
        />
      </div>

      <div className={styles.buttonWrapper}>
        <Link href='/student/new'>
          <Button className='primaryButton'>Add New</Button>
        </Link>
      </div>
    </div>
  );
} 
