import {
    Button,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Paper,
    Table, TableBody, TableCell,
    TableContainer, TableHead,
    TableRow,
    makeStyles,
} from "@material-ui/core";
import { Behavior } from '@prisma/client';
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import CheckUser from "../../auth0CheckUser";
import Navbar from "../../components/Navbar";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function manageBehaviorsPage() {
    // Verifies if user has the correct permissions
    const {allowed, role} = CheckUser(["Admin", "BCBA"])
    if(!allowed) return(<div>Redirecting...</div>);

    // fetch the behavior data on the client side
    const [behaviors, setBehaviors] = useState<Behavior[] | null >(null)
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/search/behavior`, { method: 'GET' });
                if (response.ok) {
                    const data : Behavior[] = await response.json();
                    setBehaviors(data);
                    setLoading(false);
                } else {
                    console.error('Failed to fetch data:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [behaviors]);

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [focusElement, setFocusElement] = useState<number>(-1);

    const removeBehavior = async () => {
        await fetch(
            `/api/behavior?id=${focusElement}`,
            {
                method: "DELETE",
            }
        );
        setBehaviors((prev) => {
            prev.splice(focusElement, 1);
            return prev;
        });
        setFocusElement(-1);
        setDialogOpen(false);
    };

    const classes = useStyles();
    return (
        <div>
            <Head>
                <title>Manage Behavior</title>
                <link rel="icon" href="/atc-logo.png" />
            </Head>
            <Navbar pageTitle="Manage Behavior" role={role}>
                <div
                    style={{
                        width: "100%",
                        marginBottom: "1.5rem",
                    }}
                >
                    <TableContainer component={Paper}>
                        <Table
                            className={classes.table}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="center">
                                        Behavior Name
                                    </TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Data Type</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <p>Loading data...</p>
                                ) : (
                                    behaviors.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.name}
                                            </TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell>{row.datatype}</TableCell>
                                            <TableCell align="center">
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-around",
                                                    }}
                                                >
                                                    <Link
                                                        href={`/behaviors/${row.id}`}
                                                    >
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            style={{width: "100px", marginRight:"1em",}}
                                                        >
                                                            View Details
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="contained"
                                                        style={{
                                                            backgroundColor: "#ff604f",
                                                            width: "100px",
                                                            color: "white",
                                                        }}
                                                        onClick={() => {
                                                            setFocusElement(
                                                                row.id
                                                            );
                                                            setDialogOpen(true);
                                                        }}
                                                    >
                                                        Remove Behavior
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                {/* Add dialog here */}
                <Dialog
                    open={dialogOpen}
                    onClose={() => {
                        setDialogOpen(false);
                        setFocusElement(-1);
                    }}
                >
                    <DialogTitle>Remove this behavior?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to remove this behavior?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setDialogOpen(false);
                                setFocusElement(-1);
                            }}
                        >
                            No
                        </Button>
                        <Button
                            onClick={() => {
                                removeBehavior();
                            }}
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>

                <Link href="/behaviors/add">
                    <Button variant="contained" color="primary">
                        Add Behavior
                    </Button>
                </Link>
            </Navbar>
        </div>
    );

}
