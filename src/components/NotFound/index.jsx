import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    text: {
        margin: "10rem",
       // fontSize: "30rem",
    }
}));
export default function NotFound() {
    const classes = useStyles();
    
    return(
        <h1 className={classes.text}>404 ... Not Found!</h1>
    );
}