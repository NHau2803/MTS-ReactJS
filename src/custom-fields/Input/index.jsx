import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { 
            name, 
            label, 
            placeholder, 
            value, 
            error=null, 
            onChange, 
            disabled, 
            variant="outlined",
            ref,
            ...other
            
        } = props;
    
    return (
        <TextField
            variant={variant}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...(error && {error: true, helperText: error})}
            size="small"
            disabled={disabled}
            {...other}
                        
        />
    )
}
