import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { ExitToApp } from "@material-ui/icons";

const drawerWidth = 240;

// Styles for navbar
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            paddingTop: 0,
        },
        paddingTop: "40px",
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function Logo() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.toolbar} />
            <div style={{ marginLeft: "15px" }}>
                <img src="/logo.jpeg" alt="logo" />
            </div>
        </div>
    );
}

function ManageBehaviors() {
    return (
        <div>
            <List>
                <Link href="/behaviors/manage">
                    <ListItem button>
                        <ListItemIcon>
                            <MenuIcon />
                        </ListItemIcon>
                        <ListItemText primary="Manage Behaviors" />
                    </ListItem>
                </Link>
            </List>
        </div>
    );
}

function StudentSearch() {
    return (
        <div>
            <List>
                <Link href="/student/search">
                    <ListItem button>
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Student Search" />
                    </ListItem>
                </Link>
            </List>
        </div>
    );
}

function EmployeeSearch() {
    return (
        <div>
            <List>
                <Link href="/employee/search">
                    <ListItem button>
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Employee Search" />
                    </ListItem>
                </Link>
            </List>
        </div>
    );
}

function NewUser() {
    return (
        <div>
           <Link href="/new-user">
    <ListItem button>
        <ListItemIcon>
            <AddIcon />
        </ListItemIcon>
        <ListItemText primary="New User" />
    </ListItem>
</Link>
        </div>
    );
}

function Logout() {
    return (
        <div>
            <List>
                <Link href="/api/auth/logout">
                    <ListItem button>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </Link>
            </List>
        </div>
    );
}

const Navbar = (props) => {
    const { pageTitle, role, window, children } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Logo />
            <Divider />
            <ManageBehaviors />
            <Divider />
            <List>
                <StudentSearch />
                <EmployeeSearch />
                <NewUser />
            </List>
            <Divider />
            <Logout />
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {pageTitle}
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={
                            theme.direction === "rtl" ? "right" : "left"
                        }
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div
                    className={classes.toolbar}
                    style={{ paddingBottom: "70px" }}
                />
                {children}
            </main>
        </div>
    );
};

Navbar.propTypes = {
    pageTitle: PropTypes.string.isRequired,
};

export default Navbar;
