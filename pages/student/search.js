import styles from "../../styles/SearchList.module.css";
import Link from "next/link";
import SearchList from "../../components/SearchList";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import CheckUser  from '../../auth0CheckUser';
import useSWR from 'swr'
import { useState, useEffect } from "react";
// import theme from '../src/theme';

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



export default function studentSearch({ students }) {
    // Verifies if user has the correct permissions
    const {allowed, role} = CheckUser(["Admin", "BCBA", "Technician"])
    if(!allowed) return(<div>Redirecting...</div>);

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div>
            <Head>
                <title>Student Search</title>
                <link rel="icon" href="/atc-logo.png" />
            </Head>

            <Navbar pageTitle="Student Search" role={role}>
                <div className={styles.searchPage}>
                    <FormControl>
                        <TextField
                            className={styles.searchBox}
                            id="outlined-basic"
                            label="Student Search"
                            variant="outlined"
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                        />
                    </FormControl>

                    <div>
                        <SearchList
                            students={students}
                            searchTerm={searchTerm}
                            destinationPath="/student/profile"
                        />
                    </div>

                    <div className={styles.buttonWrapper}>
                        <Link href="/student/new">
                            <Button className="primaryButton">Add New</Button>
                        </Link>
                    </div>
                </div>
            </Navbar>
        </div>
    );
} 
/* This code probably doesn't work
export default function studentSearch() { // searches from client side 
    // THIS CODE IS UNTESTED!!!!!
    const { allowed, role } = CheckUser(["Admin", "BCBA", "Technician"]);
    if (!allowed) return <div>Redirecting...</div>;
  
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
  
    useEffect(() => {
      async function fetchData() {
        let temp = await fetch(`${process.env.BASE_URL}/api/search/user`, {
          method: "POST",
        });
  
        const data = await temp.json();

        let fetchedStudents = data.map((student) => {
            student.id = student._id; 
            delete student._id; // remember to free up the memory, we don't need it anymore
            return {
              ...student,
              img: "",
            };
          });
    
          fetchedStudents.sort(function (a, b) {
            const aName = a.firstName + a.lastName;
            const bName = b.firstName + b.lastName;
            if (aName < bName) {
              return -1;
            }
            if (aName > bName) {
                return 1;
              }
              return 0;
            });
      
            setStudents(fetchedStudents);
          }
      
          fetchData();
        }, []); // Empty dependency array means this useEffect will run once when the component is mounted
      
      }

      // this block of code is for having a loading state so users can see if the data is still coming or not
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
        async function fetchData() {
          setIsLoading(true);
          // ... data fetching logic ...
      
          setStudents(fetchedStudents);
          setIsLoading(false);
        }
      
        fetchData();
      }, []); */



export const getServerSideProps = async () => { // If you see a getServerSide function, turn it into a Client Side func
    // const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
    // // const res = await fetch(`https://randomuser.me/api/`)
    // const students = await res.json()
  // TODO: search by whether has patient profile
    let temp = await fetch(`${process.env.BASE_URL}/api/search/user`, {
        method: "POST",
    });
    
    const  data  = await temp.json();

    let students = data.map((student) => {
        student.id = student._id;
        delete student._id;
        return {
            ...student,
            img: "",
        };
    });

    students.sort(function (a, b) {
        const aName = a.firstName + a.lastName;
        const bName = b.firstName + b.lastName;
        if (aName < bName) {
            return -1;
        }
        if (aName > bName) {
            return 1;
        }
        return 0;
    });

    return {
        props: {
            students,
        },
    };
}; 
