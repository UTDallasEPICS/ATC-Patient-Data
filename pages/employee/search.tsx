import styles from "../../styles/SearchList.module.css";
import Link from "next/link";
import SearchList from "../../components/SearchList";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

import { Employee, Student } from "../../types";

export default function EmployeeSearch({ employees }: EmployeeSearchProps) {
  const[loading, setLoading] = useState(true);
  const [canShow, setCanShow] = useState(false);
  const finishedLoadingAndCanShow = !loading && canShow;
  const [searchTerm, setSearchTerm] = useState<string>("");

  const Conditional = ({
    showWhen,
    children,
  }: {
    showWhen: boolean;
    children: ReactNode;
  }) => {
    if (showWhen) return <>{children}</>
    return <></>;
  };

  const [employees, setEmployees] = useState(null)
  const [employeeList, setEmployeeList] = useState([]);
  
  // fetch data from client side
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/search/user', {
          method: "POST",
        });
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
        } else {
          console.error('Failed to fetch data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  };
  fetchData();
  }, []);

  useEffect(() => {
    if (employees) {
      employees.sort(function (a, b) {
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
    }
}, [employees]); // called when employees has to be rerendered



  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      {
        (!loading && canShow) 
      }
      <Conditional showWhen={finishedLoadingAndCanShow}>
        <h1> Welcome</h1>
      </Conditional>
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
    </div>
  );
}
