import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import NewEntity from "../components/NewEntity/NewEntity";
import { Input, InputType } from "../components/NewEntity/Interfaces";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import { Employee } from "../types";
import { Student } from "interfaces/Student";

const NewUser = () => {
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

    const emailInput: Input = {
        attributeName: "email",
        type: InputType.TEXT,
        name: "Email address",
    };

    const userTypeInput: Input = {
        attributeName: "userType",
        type: InputType.SELECT,
        name: "User Type",
        options: ["student", "employee", "guardian"],
    };

    const textInputs: Input[] = [
        firstNameInput,
        lastNameInput,
        birthDateInput,
        emailInput,
        userTypeInput,
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
        const [firstName, lastName, birthday, email, userType] =
            fields.map((field) => field.value || "");

        const newUser: Employee | Student = {
            firstName,
            lastName,
            birthday: convertStringToDate(birthday),
            email,
            ...(userType === "employee"
                ? { otherInfo: "" } // Additional fields for employees
                : userType === "student"
                ? { parentPhone: "", parentEmail: "" } // Additional fields for students
                : {}),
        };

        await fetch("/api/createUser", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        if (userType === "employee") {
            router.push("/employee/search");
        } else if (userType === "student") {
            router.push("/student/search");
        } else {
            // Handle other user types or redirection logic
        }
    };

    return (
        <div>
            <Link href="/">
                <Button className="primaryButton">Go Back</Button>
            </Link>
            <div>
                <Typography variant="h6" gutterBottom>
                    New User
                </Typography>
                <NewEntity textFields={textInputs} submitFunction={handleSubmit} />
            </div>
        </div>
    );
};

export default NewUser;
