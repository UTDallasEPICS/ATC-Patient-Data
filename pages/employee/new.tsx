import NewEntity from "../../components/NewEntity/NewEntity";
import { Input, InputType } from "../../components/NewEntity/Interfaces";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import { Employee } from "../../types";
import { useRouter } from "next/router";
import CheckUser  from '../../auth0CheckUser';

const newEmployee = () => {
  // Verifies if user has the correct permissions
  const {allowed, role} = CheckUser(["Admin"])
  if(!allowed) return(<div>Redirecting...</div>);

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

  const IDinput: Input = {
    attributeName: "id",
    name: "ID",
    type: InputType.TEXT,
    required: true,
  }

  const otherInfoInput: Input = {
    attributeName: "other_info",
    type: InputType.MULTILINE_TEXT,
    name: "Other info",
  };

  const phoneNumberInput: Input = {
    attributeName: "phone_number",
    type: InputType.TEXT,
    name: "Phone number",
  };

  const studentsInput: Input = {
    attributeName: "students",
    name: "Students: ",
    type: InputType.MULTILINE_TEXT,
  }

  const emailInput: Input = {
    attributeName: "email",
    type: InputType.TEXT,
    name: "Email address",
  };


  const textInputs: Input[] = [
    firstNameInput,
    lastNameInput,
    phoneNumberInput,
    emailInput,
    IDinput,
    studentsInput,
    otherInfoInput,
  ];

  const handleSubmit = async (fields: Input[]) => {
    /*
    console.log(
      "handleSubmit: " +
        fields.map((field) => {
          return field.name + ": " + field.value;
        })

    );*/
    const [firstName, lastName, img, _id, students, phoneNumber, email, otherInfo] =
            fields.map((field) => field.value || "");

    const newUser: Employee = {
      _id,
      img,
      firstName,
      lastName,
      phoneNumber,
      email,
      students,
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
      <Head>
        <title>New Employee</title>
        <link rel="icon" href="/atc-logo.png" />
      </Head>

      <Navbar pageTitle="New Employee" role={role}>   
          <Link href="/employee/search">
                <Button className="primaryButton">Go Back</Button>
          </Link>         
                <div>
                    <NewEntity
                        textFields={[...textInputs]}
                        submitFunction={handleSubmit}
                    />
                </div>
            </Navbar>
    </div>
  );
};

export default newEmployee;
