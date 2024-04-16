import NewEntity from "../../components/NewEntity/NewEntity";
import { Input, InputType } from "../../components/NewEntity/Interfaces";

import { GetServerSideProps } from "next";

import { useRouter } from 'next/router';
import { Patient, Student } from "../../types";
import { useState, useEffect } from "react";

type StudentWithIdAndImg = Student & { id: string; img: string };

const editStudent = (props: { student: StudentWithIdAndImg }) => {
    const [students, setStudents] = useState(null)
    const [studentList, setStudentList] = useState([]);
    // fetch data from client side
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/student`, { method: 'GET' });
                if (response.ok) {
                    const data = await response.json();
                    setStudents(data);
                } else {
                    console.error('Failed to fetch data:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        if (students) {
            const studentList = students.map((student, idx) => ({ // this is acting like a copy constructor, sort of
                firstName: student.firstName,
                lastName: student.lastName,
                img: student.img,
                dob: convertStringToDate(student.dob),
                parentPhone: student.parentPhone,
                email: student.email,
                parentEmail: student.parentEmail,
                otherInfo: student.otherInfo,
                id: idx + 1,
                _id: student.id,
            }));
            console.log(studentList)
            setStudentList(studentList);
        }
    }, [students]);
    const { student } = props;
    const router = useRouter();

    const formatDate = (d: any) => {
        d = new Date(d);
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    };

    const firstNameInput: Input = {
        attributeName: "first_name",
        name: "First Name",
        type: InputType.TEXT,
        required: true,
        value: student.firstName,
    };

    const lastNameInput: Input = {
        attributeName: "last_name",
        name: "Last Name",
        type: InputType.TEXT,
        required: true,
        value: student.lastName,
    };

    const birthDateInput: Input = {
        attributeName: "birth_date",
        type: InputType.DATE,
        name: "Birth Date",
        required: true,
        value: formatDate(student.dob),
    };

    const parentPhoneInput: Input = {
        attributeName: "parent_phone",
        type: InputType.TEXT,
        name: "Parent Phone Number",
        value: student.parentPhone,
    };

    const emailInput: Input = {
        attributeName: "email",
        type: InputType.TEXT,
        name: "Email address",
        value: student.email,
    };

    const parentEmailInput: Input = {
        attributeName: "parentEmail",
        type: InputType.TEXT,
        name: "Parent Email Address",
        value: student.parentEmail,
    };

    const textInputs: Input[] = [
        firstNameInput,
        lastNameInput,
        birthDateInput,
        parentPhoneInput,
        emailInput,
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
        const [firstName, lastName, birthday, parentPhone, email, parentEmail] =
            fields.map((field) => field.value || "");

        try {
            await fetch(`/student/${student.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    birthday: convertStringToDate(birthday),
                    email,
                    parentPhone,
                    parentEmail,
                }),
            });
            router.push("/student/search");
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

export default editStudent;
