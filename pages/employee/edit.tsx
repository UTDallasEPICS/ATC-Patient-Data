import NewEntity from "../../components/NewEntity/NewEntity";
import { Input, InputType } from "../../components/NewEntity/Interfaces";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import { Employee } from "../../types";
import { useRouter } from "next/router";
import CheckUser  from '../../auth0CheckUser';
import { useState, useEffect } from "react";


type EmployeeWithIdAndImg = Employee & { id: string; img: string };

const editEmployee = (props: { employee: EmployeeWithIdAndImg }) => {
  // Verifies if user has the correct permissions
  const {allowed, role} = CheckUser(["Admin"])
  if(!allowed) return(<div>Redirecting...</div>);

  // fetch the employee data on the client side
    // from here to...
    const [employees, setEmployees] = useState(null)
    const [employeeList, setEmployeeList] = useState([]);
    // fetch data from client side
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/employee`, { method: 'GET' });
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
/*
export interface Employee {
    _id: string;
    img: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    otherInfo: string;
    students: string[];
} 
*/

    useEffect(() => {
        if (employees) {
            const employeeList = employees.map((employee, idx) => ({ // this is acting like a copy constructor, sort of
                firstName: employee.firstName,
                lastName: employee.lastName,
                phoneNumber: employee.phoneNumber,
                email: employee.email,
                otherInfo: employee.otherInfo,
                students: employee.students,
                id: idx + 1,
                _id: employee.id,
                img: employee.img,
            }));
            console.log(employeeList)
            setEmployeeList(employeeList);
        }
    }, [employees]);
    // ... to here

  const { employee } = props;
  const router = useRouter();


  const firstNameInput: Input = {
    attributeName: "first_name",
    name: "First Name",
    type: InputType.TEXT,
    required: true,
    value: employee.firstName,
  };

  const lastNameInput: Input = {
    attributeName: "last_name",
    name: "Last Name",
    type: InputType.TEXT,
    required: true,
    value: employee.lastName,
  };

  const otherInfoInput: Input = {
    attributeName: "other_info",
    type: InputType.MULTILINE_TEXT,
    name: "Other info",
    value: employee.otherInfo,
  };

  const phoneNumberInput: Input = {
    attributeName: "phone_number",
    type: InputType.TEXT,
    name: "Phone number",
    value: employee.phoneNumber,
  };

  const emailInput: Input = {
    attributeName: "email",
    type: InputType.TEXT,
    name: "Email address",
    value: employee.email,
  };
  const studentsInput: Input = {
    attributeName: "students",
    type: InputType.MULTIPLE_ITEMS,
    name: "Students",
    value: employee.students,
  };
  const textInputs: Input[] = [
    firstNameInput,
    lastNameInput,
    phoneNumberInput,
    emailInput,
    studentsInput,
    otherInfoInput,
  ];


  const handleSubmit = async (fields: Input[]) => {
    const [firstName, lastName, , phoneNumber, email, otherInfo] =
        fields?.map((field) => field?.value || "");

    try {
        await fetch(`/employee/${employee.id}`, {
            method: "patch",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                phoneNumber,
                otherInfo,
            }),
        });
        router.push("/employee/search");
    } catch (error) {
        console.log("Failed to update profile! Please try again later");
        console.error(error);
    }
};

return (
    <div>
        <Head>
            <title>Edit Employee</title>
            <link rel="icon" href="/atc-logo.png" />
        </Head>

        <Navbar pageTitle="Edit Employee" role={role}>
            <div>
                <NewEntity
                    textFields={textInputs}
                    submitFunction={handleSubmit}
                />
            </div>
        </Navbar>
    </div>
);
};

export default editEmployee;
