import NewEntity from "../../components/NewEntity/NewEntity";
import { Input, InputType } from "../../components/NewEntity/Interfaces";

import Link from "next/link";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";

import { Employee } from "../../types";
import { useEffect, useState } from "react";

const newEmployee = () => {
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
      if (employees) {
        const employeeList = employees.map((employee, idx) => ({ // this is acting like a copy constructor, sort of
            firstName: employee.firstName,
            dob: convertStringToDate(employee.dob),
            phoneNumber: employee.phoneNumber,
            email: employee.email,
            otherInfo: employee.otherInfo,
            id: idx + 1,
            _id: employee.id,
        }));
        console.log(employeeList)
        setEmployeeList(employeeList);
    }
  }, [employees]);
  const router = useRouter();
  const firstNameInput: Input = {
    attributeName: "first_name",
    name: "First Name",
    type: InputType.TEXT,
    required: true,
  };

  const lastNameInput: Input = {
    attributeName: "last_name",
    name: "Last Name",
    type: InputType.TEXT,
    required: true,
  };

  const otherInfoInput: Input = {
    attributeName: "other_info",
    type: InputType.MUTILINE_TEXT,
    name: "Other info",
  };

  const phoneNumberInput: Input = {
    attributeName: "phone_number",
    type: InputType.TEXT,
    name: "Phone number",
  };

  const emailInput: Input = {
    attributeName: "email",
    type: InputType.TEXT,
    name: "Email address",
  };

  const textInputs: Input[] = [
    firstNameInput,
    lastNameInput,
    //birthDateInput,
    phoneNumberInput,
    emailInput,
    otherInfoInput,
  ];

  const handleSubmit = async (fields: Input[]) => {
 
    const [firstName, lastName, phoneNumber, email, otherInfo] =
            fields.map((field) => field.value || "");

    const newUser: Employee = {
      firstName,
      lastName,
      //birthday: convertStringToDate(birthday),
      phoneNumber,
      email,
      otherInfo,
    };
    await fetch("/employee/", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        router.push("/employee/search");
  };
  


  return (
    <div>
      <Link href="/employee/search">
        <Button className="primaryButton">Go Back</Button>
      </Link>         
      <div>
        <NewEntity
          textFields={[...textInputs]}
          submitFunction={handleSubmit}
        />
      </div>
    </div>
  );
};

export default newEmployee;
