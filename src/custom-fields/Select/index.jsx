import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      //  minWidth: theme.spacing(28),
    },
    muiSelect: {
       // maxHeight: theme.spacing(5),
    }


}));

export default function Select(props) {

    const classes = useStyles();

    const { name, label, value, error=null, onChange, options } = props;

    return (
        <FormControl 
           // className={classes.root}
            variant="outlined" 
            {...(error && {error:true})}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                className={classes.muiSelect}
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (
                            <MenuItem 
                                key={item.id} 
                                value={item.id+""}
                            >
                                {item.title}
                            </MenuItem>
                        )
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
