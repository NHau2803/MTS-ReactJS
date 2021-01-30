import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
//import { makeStyles } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//     root: {
//        // background: "red",
//      //   width: theme.spacing(27.75),    
//     },


// }));

export default function DatePicker(props) {

   // const classes = useStyles();

    const { name, label, value, onChange } = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker 
              //  className={classes.root}
                disableToolbar 
                variant="inline" 
                inputVariant="outlined"
                label={label}
                format="dd/MM/yyyy"
                name={name}
                value={value}
                onChange={date =>onChange(convertToDefEventPara(name,date))}
                size="small"

            />
        </MuiPickersUtilsProvider>
    )
}
