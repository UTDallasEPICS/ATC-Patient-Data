import styles from "../../styles/SearchList.module.css";
import Link from "next/link";
import SearchList from "../../components/SearchList";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import CheckUser from "../../auth0CheckUser";
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
    // Verifies if user has the correct permissions
    const {allowed, role} = CheckUser(["Admin", "BCBA", "Technician"])
    if(!allowed) return(<div>Redirecting...</div>);
const [students, setStudents] = useState(null);
    useEffect(() => {
        let temp = fetch('/api/search/user', {
                     method: "POST",
                 }).then(temp => temp.json()) // return value is now json
        .then(body => { setStudents(body.filter()) // what is body??? ask rigre?
        }); 
        students?.map((student: any) => {
            return {
                ...student,
                img: "",
            };
        }) || []; // If students doesn't exist, then this will return empty array (null). From this point on, we don't need to check if "s" is defined.
        students?.sort(function (a, b) {
            const aName = a.firstName + a.lastName;
            const bName = b.firstName + b.lastName;
            if (aName < bName) {
                return -1;
            }
            if (aName > bName) {
                return 1;
            }
            return 0;
        }) || [];
    }, []); // called when component is mounted

    const [searchTerm, setSearchTerm] = useState(""); // NEVER mutate the value of searchTerm without the setSearchTerm function.

  return (
    <div>
      <Head>
        <title>Student Search</title>
        <link rel='icon' href='/atc-logo.png' />
      </Head>

      <Navbar pageTitle='Student Search' role={role}>
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
              students={students}
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
      </Navbar>
    </div>
  );
}
