import React, { useEffect, useState } from "react";

import Avatar from "../../components/Avatar";
import OtherInfo from "../../components/OtherInfo";
import styles from "../../styles/StudentProfile.module.css";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Link from "next/link";

import {StudentProfile, Student} from '../../types';
import { GetServerSideProps } from "next";

const studentProfile: React.FC = ( ) => {
const [students, setStudents] = useState(null)
const [studentList, setStudentList] = useState([]);
    // fetch data from client side
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/patient/${students.id}`, {
                            method: "get",
                                            });
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
                id: student.id,
                firstName: student.firstName,
                lastName: student.lastName,
                img: "",
                dob: student.birthday,
                parentPhone: student.parentPhone,
                email: student.email,
                parentEmail: student.parentEmail,
                funder: student.funder,
                otherInfo: student.otherInfo,
            }));
            console.log(studentList);
            setStudentList(studentList);
        }
    }, [students]);
  var editStudent: boolean = false;
  const role = 'Admin' // TODO: load from user info, see issue #48
    if (role == "Admin") editStudent = true;
    var studentAnalytics: boolean = false;
    if (["Admin","BCBA","Technician"].includes(role)) studentAnalytics = true;

    //State handles the notifications for when the archive is clicked
    const [open, setOpen] = useState<boolean>(false);
    const handleClickOpen = (): void => {
        setOpen(true);
    };
    const handleClose = (): void => {
        setOpen(false);
    };
    const convertStringToDate = (date: string) => {
        const data = date.split("-");
        return new Date(
            parseInt(data[0]),
            parseInt(data[1]) - 1,
            parseInt(data[2])
        );
    };
    const handleArchive = async (): Promise<void> => {
        const temp = await fetch(`/patient/${students.id}`, {
            method: "DELETE",
        });
        const { data } = await temp.json();
        console.log(data);
        handleClose();
    }

    //State for handling when other info is being pressed
    const [otherInfoOpen, setOtherInfo] = useState<boolean>(false);
    //Opens other info
    const openOtherInfo = (): void => {
        setOtherInfo(true);
    };
    //Close Other Info
    const closeOtherInfo = (): void => {
        setOtherInfo(false);
    };

    const formatDate = (d: Date): string => {
        return d.toLocaleDateString('en-us', { year:"numeric", month:"short", day: 'numeric'})
        //return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    };

    return (
      <div className={styles.container}>
        <div className={styles.profilePage}>
            <span className={styles.picture}>
                <Avatar diameter="175px" img={students.img} />
            </span>
            <h1 className={styles.info}>
                {students.firstName} {students.lastName}
            </h1>
                { studentAnalytics ? 
                <div className={styles.bgOther}>
                    <Link
                        href={{
                            pathname: "/session/add",
                            query: { 
                                studentID: students.id, 
                                firstName: students.firstName,
                                lastName: students.lastName,
                            },
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="primary"
                            className={styles.buttonGroup}
                        >
                            New Session
                        </Button>
                    </Link>
                </div> : null}
            <br />
            <Divider variant="middle" />
            <p className={styles.label}>Date of Birth:</p>{" "}
            <p className={styles.info}>
                {" "}
                {formatDate(new Date(students.dob))}
            </p>
            <p className={styles.label}>Parent's Phone Number:</p>{" "}
            <p className={styles.info}> {`(${students.parentPhone.slice(0,3)}) ${students.parentPhone.slice(3,6)}-${students.parentPhone.slice(6,10)}`}</p>
            <p className={styles.label}>Email: </p>{" "}
            <p className={styles.info}> {students.email}</p>
            <p className={styles.label}>Parent's email: </p>{" "}
            <p className={styles.info}> {students.parentEmail}</p>
            <Divider variant="middle" />
            <p className={styles.label}>Other Info:</p>
            <div className={styles.bg}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={openOtherInfo}
                    className={styles.buttonGroup}
                >
                    Other Info
                </Button>
            </div>
            <div className={styles.bg}>
                <br />
            {
                editStudent ? (
                <span>
                    <Link
                        href={{
                            pathname: "/student/edit",
                            query: { studentID: students.id },
                        }}
                    >
                        <Button className={styles.buttonGroup1}>
                            Edit
                        </Button>
                    </Link>
                    <Link
                        href={{
                            pathname: "/editProgram",
                            query: { studentID: students.id },
                        }}
                    >
                        <Button className={styles.buttonGroup2}>
                            Edit Program
                        </Button>
                    </Link>
                    <br />
                    <Button
                        className={styles.buttonGroup1}
                        onClick={handleClickOpen}
                    >
                        Archive
                    </Button>
                </span>
                ) : null
            }
            {
                studentAnalytics ? (
                <span>
                    <Link
                        href={{
                            pathname: "/analytics",
                            query: { studentID: students.id },
                        }}
                    >
                        <Button className={styles.buttonGroup2}>
                            View Reports
                        </Button>
                    </Link>
                </span>
                ) : null
            }
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to archive this student?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        When archiving a student you will no longer be
                        able to view any of the records of the student.
                        To regain access you will have to get access
                        from an administrator.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="primary"
                        className={styles.buttonGroup}
                    >
                        No
                    </Button>
                    <Button
                        onClick={handleArchive}
                        color="primary"
                        autoFocus
                        className={styles.buttonGroup}
                    >
                        <Link href="/student/search">Yes</Link>
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={otherInfoOpen}
                onClose={closeOtherInfo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Other Info:"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {students.otherInfo}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={closeOtherInfo}
                        color="primary"
                        autoFocus
                        className={styles.buttonGroup}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>{" "}
      </div>
    );
};

export default studentProfile; 
