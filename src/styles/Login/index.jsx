import { COLOR_PRIMARY, COLOR_PRIMARY_DARK } from "styles/Color";

const { makeStyles } = require("@material-ui/core");

export const useLoginStyles = makeStyles((theme) => ({
    root: {
        margin: "auto auto 1rem auto",
        flexGrow: 1,
    },
    grid: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(4),
    },
    pager:{
       padding: theme.spacing(4),
    },
    text: {
        color: COLOR_PRIMARY,
    },
    link: {
        textDecoration: "none",
        color: COLOR_PRIMARY,
        '&:hover': {
            transition: "all 0.5s ease-in-out 0s",
            color: COLOR_PRIMARY_DARK,
          },

    },
 
}));