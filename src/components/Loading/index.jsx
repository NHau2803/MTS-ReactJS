import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    loading: {
        margin: "10rem",
       // fontSize: "30rem",
    }
}));
export default function Loading() {
    const classes = useStyles();

    return <CircularProgress className={classes.loading} disableShrink />;
}