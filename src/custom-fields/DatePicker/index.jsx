import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePicker(props) {

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
                onChange={date =>onChange(convertToDefEventPara(name, date))}
                size="small"
                

            />
                {/* <KeyboardTimePicker
                variant="inline" 
                inputVariant="outlined"
                label={label}
                name={name}
                value={value}
                onChange={date =>onChange(convertToDefEventPara(name, date))}
                size="small"
        /> */}
        </MuiPickersUtilsProvider>
    )
}
