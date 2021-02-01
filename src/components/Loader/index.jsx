//import React from 'react';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//     loading: {
        
//         margin: "10rem 0 0 0",
        
//     }
// }));
// export default function Loader() {
//     const classes = useStyles();

//     return <CircularProgress className={classes.loading} />;
// }

import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    text: {
        margin: "10rem 0 0 0",
    }
}));
export default function Loader() {
    const classes = useStyles();
    
    return(
        <p className={classes.text}>Loading...</p>
    );
}