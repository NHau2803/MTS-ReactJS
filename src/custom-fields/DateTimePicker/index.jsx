import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DateTimePicker(props) {

    const { name, label, value, error, onChange } = props

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
                variant="inline" 
                inputVariant="outlined"
                label={label}
                format={"dd/MM/yyyy hh:mm a"}
                name={name}
                value={value}
                onChange={date =>onChange(convertToDefEventPara(name, date))}
                size="small"
                helperText={error}
                error={error? true : false}
                

            />
        
        </MuiPickersUtilsProvider>
    )
}
