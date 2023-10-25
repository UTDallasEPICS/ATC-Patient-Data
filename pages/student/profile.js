import React, {useState} from "react";
import Navbar from "../../components/Navbar";
import Head from "next/head";
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
import CheckUser  from '../../auth0CheckUser';


// empty arrow func; DO NOT TAKE IN PROPS
const studentProfile = () => { // studentProfile creates a Student Profile Component
    // Verifies if user has the correct permissions
    const {allowed, role} = CheckUser(["Admin", "BCBA", "Technician", "Guardian"]) // check
    if(!allowed)  { return(<div>Redirecting...</div>); }

    
    // State has class level variables (?)
    // Every time a state changes, the component is rerendered

    // useState returns an array of two items; first is a reference to the component; second is a func
    const [ student, setStudent ] = useState(); // From the perspective of the human, we make a variable for this component
    // to reference the variable in question, we call student
    // to mutate the variable in question, setStudent should be called

    // useEffect is a React Hook (basically a backend method)
    // constructor called WHEN object is created


    useEffect(() => { 
        // SAMUEL TODO FIX THE HARDCODE
        const temp = await fetch(`${process.env.BASE_URL}/patient/1`, { method: "get", } ); // THE 1 IS HARDCODED, CHANGE IT LATER
    const { data } = await temp.json();

    const s = { // Student is a data object/component
        id: query.id, // this came from server side props
        firstName: data.firstName,
        lastName: data.lastName,
        img: "",
        dob: data.birthday,
        parentPhone: data.parentPhone,
        email: data.email,
        parentEmail: data.parentEmail,
    };

    setStudent(s);

    }, []) 
    // Dependency Array 
    // useEffect called whenever it changes; should not be used for now until "later"

    var editStudent = false;
    if (role == "Admin") editStudent = true;
    var studentAnalytics = false;
    if (role == "Admin" || role == "BCBA" || role == "Technician") studentAnalytics = true;

    //State handles the notifications for when the archive is clicked
    const [open, setOpen] = useState(false);
    console.log(role)
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleArchive = async () => {
        const temp = await fetch(`${process.env.BASE_URL}/patient/${student.id}`, {
            method: "DELETE",
        });
        const { data } = await temp.json();
        console.log(data)
        handleClose()
    }

    //State for handling when other info is being pressed
    const [otherInfoOpen, setOtherInfo] = React.useState(false);
    //Opens other info
    const openOtherInfo = () => {
        setOtherInfo(true);
    };
    //Close Other Info
    const closeOtherInfo = () => {
        setOtherInfo(false);
    };

    const formatDate = (d) => {
        return d.toLocaleDateString('en-us', { year:"numeric", month:"short", day: 'numeric'})
        //return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    };

    return ( // This should be jsx
    // Any time you want to include code, you use {}
    
        <div className={styles.container}>
            <Head>
                <title>Student Profile</title>
                <link rel="icon" href="/atc-logo.png" />
            </Head>

            <Navbar pageTitle="Student Profile" role={role} >
                <div className={styles.profilePage}>
                    <span className={styles.picture}>
                        <Avatar diameter="175px" img={student.img} />
                    </span>
                    <h1 className={styles.info}>
                        {student.firstName} {student.lastName}
                    </h1>
                        { studentAnalytics ? 
                        <div className={styles.bgOther}>
                            <Link
                                href={{
                                    pathname: "/session/add",
                                    query: { 
                                        studentID: student.id, 
                                        firstName: student.firstName,
                                        lastName: student.lastName,
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
                        {formatDate(new Date(student.dob))}
                    </p>
                    <p className={styles.label}>Parent's Phone Number:</p>{" "}
                    <p className={styles.info}> {`(${student.parentPhone.slice(0,3)}) ${student.parentPhone.slice(3,6)}-${student.parentPhone.slice(6,10)}`}</p>
                    <p className={styles.label}>Email: </p>{" "}
                    <p className={styles.info}> {student.email}</p>
                    <p className={styles.label}>Parent's email: </p>{" "}
                    <p className={styles.info}> {student.parentEmail}</p>
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
                                    query: { studentID: student.id },
                                }}
                            >
                                <Button className={styles.buttonGroup1}>
                                    Edit
                                </Button>
                            </Link>
                            <Link
                                href={{
                                    pathname: "/editProgram",
                                    query: { studentID: student.id },
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
                                    query: { studentID: student.id },
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
                                {student.otherInfo}
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
                <br />
            </Navbar>
        </div>
    );
};

export default studentProfile;

// Need UseEffect()
// Props is short for property
// Props is an input for a component
// The student prop is called in the above function when returning

// DEPRECATED, DESTROY
export const getServerSideProps = async ({ query }) => {
    // SAMUEL TODO: KILL IT
    const temp = await fetch(`${process.env.BASE_URL}/patient/${query.id}`, {
        method: "get",
    });
    const { data } = await temp.json();

    const student = { // Student is a data object/component
        id: query.id,
        firstName: data.firstName,
        lastName: data.lastName,
        img: "",
        dob: data.birthday,
        parentPhone: data.parentPhone,
        email: data.email,
        parentEmail: data.parentEmail,
    };
    return {
        props: {
            student,
        },
    };
};
