import { COLOR_PRIMARY, COLOR_WHITE } from "constants/color";

const { makeStyles } = require("@material-ui/core");

export const useFormStyles = makeStyles((theme) => ({
    root: {
        margin: "5rem auto 1rem auto",
        flexGrow: 1,
    },
    icon: {
        fontSize: theme.spacing(10),
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


export const useTableStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
    },
    title: {
        marginTop: theme.spacing(10),
    },
    tableCell: {
        maxWidth: theme.spacing(35),
    }
}));

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


export const useSelectTopicStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      //maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
    subHeader: {
      fontSize: "1.5rem",
    },
  }));