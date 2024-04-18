import NewEntity from "../../components/NewEntity/NewEntity";
import { Input, InputType } from "../../components/NewEntity/Interfaces";


import { Employee } from "../../types";
import { Employee} from "../../types";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";


type EmployeeWithIdAndImg = Employee & { id: string; img: string };

const editEmployee = (props: { employee: EmployeeWithIdAndImg }) => {

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
    useEffect(() => {
        if (employees) {
            const employeeList = employees.map((employee, idx) => ({ // this is acting like a copy constructor, sort of
                firstName: employee.firstName,
                //dob: convertStringToDate(employee.dob),
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
 
    // ... to here

  const { employee } = props;
  const router = useRouter();

  /*
  const formatDate = (d: any) => {
      d = new Date(d);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };
  */

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
    type: InputType.MUTILINE_TEXT,
    name: "Other info",
    value: employee.otherInfo,
  };

  const phoneNumberInput: Input = {
    attributeName: "phone_number",
    type: InputType.TEXT,
    name: "Phone number",
    value: employee.phone,
  };

  const emailInput: Input = {
    attributeName: "email",
    type: InputType.TEXT,
    name: "Email address",
    value: employee.email,
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

    try {
        await fetch(`/employee/${employee.id}`, {
            method: "patch",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                //dob: convertStringToDate(dob),
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
    <div>
      <NewEntity
        textFields={textInputs}
        submitFunction={handleSubmit}
      />
    </div>
  </div>
);
};

export default editEmployee;
