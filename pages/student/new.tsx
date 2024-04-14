import NewEntity from "../../components/NewEntity/NewEntity";
import { Input, InputType } from "../../components/NewEntity/Interfaces";


import { useRouter } from 'next/router';
import Link from "next/link";
import Button from "@material-ui/core/Button";
import { Patient } from "../../types";
import { Student } from "../../interfaces/Student";

const newStudent = (): JSX.Element => {
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

    const birthDateInput: Input = {
        attributeName: "birth_date",
        type: InputType.DATE,
        name: "Birth Date",
        required: true,
    };

    const parentPhoneInput: Input = {
        attributeName: "parent_phone",
        type: InputType.TEXT,
        name: "Parent Phone Number",
    };

    const emailInput: Input = {
        attributeName: "email",
        type: InputType.TEXT,
        name: "Email address",
    };

    const parentEmailInput: Input = {
        attributeName: "parent_email",
        type: InputType.TEXT,
        name: "Parent email address",
    };

    const textInputs: Input[] = [
        firstNameInput,
        lastNameInput,
        birthDateInput,
        emailInput,
        parentPhoneInput,
        parentEmailInput,
    ];

    const convertStringToDate = (date: string) => {
        const data = date.split("-");
        return new Date(
            parseInt(data[0]),
            parseInt(data[1]) - 1,
            parseInt(data[2])
        );
    };

    const handleSubmit = async (fields: Input[]) => {
        const [firstName, lastName, birthday, email, parentPhone, parentEmail] =
            fields.map((field) => field.value || "");

        const newUser: Student = {
            firstName,
            lastName,
            birthday: convertStringToDate(birthday),
            email,
            parentPhone,
            parentEmail,
        };

        await fetch("/patient/", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        router.push("/student/search");
    };

    return (
      <div>
        <Link href="/student/search">
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

export default newStudent; 
