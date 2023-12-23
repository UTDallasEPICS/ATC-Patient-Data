import React, { FC, useState } from 'react';
import styles from "../../styles/SearchList.module.css";
import Link from "next/link";
import SearchList from "../../components/SearchList";
import { FormControl, TextField } from "@material-ui/core";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import CheckUser from '../../auth0CheckUser';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  img: string;
}

interface EmployeeSearchProps {
  employees: Employee[];
  

}

const buttonColor: string = "#0F5787";

const EmployeeSearch: FC<EmployeeSearchProps> = ({ employees }) => {
  const { allowed, role } = CheckUser(["Admin"]);
  if (!allowed) return (<div>Redirecting...</div>);

  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div>
      <Head>
        <title>Employee Search</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>

      <Navbar pageTitle="Employee Search" role={role}>
        <div className={styles.searchPage}>
          <FormControl>
            <TextField
              className={styles.searchBox}
              id="outlined-basic"
              label="Employee Search"
              variant="outlined"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </FormControl>

          <div>
            <SearchList
              students={employees}
              searchTerm={searchTerm}
              destinationPath="/employee/profile"
            />
          </div>

          <div className={styles.buttonWrapper}>
            <Link href="/employee/new">
              <Button className="primaryButton">Add New</Button>
            </Link>
          </div>
        </div>
      </Navbar>
    </div>
  );
}

export const getServerSideProps = async () => {
  let temp = await fetch(process.env.AUTH0_BASE_URL + '/api/search/user', {
    method: "POST",
});


  const data = await temp.json();

  let employees: Employee[] = data.map((employee: any) => {
    employee.id = employee._id;
    delete employee._id;
    return {
      ...employee,
      img: "",
    };
  });

  employees.sort(function (a: Employee, b: Employee) {
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
      employees,
    },
  };
};