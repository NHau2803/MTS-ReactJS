import React from 'react'
import { TextField } from '@material-ui/core';
import { SET_BORDER_COLOR_PRIMARY } from '../../../constant/color';


// const useStyles = makeStyles((theme) => ({
//     root: {
//         border: "1px solid red",
//         borderRadius: theme.shape.borderRadius
//     },
    
// }));
export default function Input(props) {

    //const classes = useStyles()

    const { name, label, placeholder, value, error=null, onChange, disabled, ...other } = props;
    
    return (
        
        <TextField

            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...other}
            {...(error && {error:true,helperText:error})}
            size="small"
            disabled={disabled}
          //  style={SET_BORDER_COLOR_PRIMARY}
            
            
        />
    )
}
