import { COLOR_PRIMARY } from "styles/Color";

const { makeStyles } = require("@material-ui/core");

export const useFormStyles = makeStyles((theme) => ({
    root: {
        margin: "5rem auto 1rem auto",
        flexGrow: 1,
    },
    icon: {
        fontSize: theme.spacing(15),
    },
    iconPrimary: {
        width: "3rem",
        color: COLOR_PRIMARY, 
    },
    grid: {
        display: "flex",
        justifyContent: "center",
    },
    gridLeft: {
        padding: theme.spacing(2),
    },
    gridRight: {
        padding: theme.spacing(2)
    },
    gridItem: {
        padding: theme.spacing(2),
    },
    formGroup: {
        margin: theme.spacing(1),
    },
    submit: {
        //background: "red",
    },

   
}));