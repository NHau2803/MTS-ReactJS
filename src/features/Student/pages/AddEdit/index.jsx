import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    text: {
        margin: "10rem",
       // fontSize: "30rem",
    }
}));
export default function AddEditPage() {
    const classes = useStyles();
    
    return(
        <h1 className={classes.text}>AddEdit</h1>
    );
}