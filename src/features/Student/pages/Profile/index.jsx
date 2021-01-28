import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    text: {
        margin: "10rem",
    }
}));
export default function ProfilePage() {
    const classes = useStyles();
    
    return(
        <h1 className={classes.text}>Profile</h1>
    );
}