import { COLOR_PRIMARY, COLOR_WHITE } from "styles/Color";

const { makeStyles } = require("@material-ui/core");

export const useInfoStyles = makeStyles((theme) => ({
    root: {
        margin: "5rem auto 1rem auto",
        flexGrow: 1,
    },
    grid: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(1),
       
    },
    pager:{
        padding: theme.spacing(0.5),
    },
    title:{
        background: COLOR_PRIMARY,
        color: COLOR_WHITE,
        borderRadius: theme.spacing(0.5)
    },
    left: {
        textAlign: "left",
        paddingLeft : "10%",
    },
    right: {
        textAlign: "left",
        paddingLeft : "50%",
     
    }
}));