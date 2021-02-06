import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label, placeholder, value, error=null, onChange, disabled, variant="outlined",...other } = props;
    
    return (
        <TextField

            variant={variant}
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
