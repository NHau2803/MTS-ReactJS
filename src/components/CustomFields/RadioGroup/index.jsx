import React from 'react'
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      //  minWidth: theme.spacing(25),
    },
    label: {
       // fontSize: theme.spacing(1.5),
        display: "flex",
        justifyContent: "left",
        
    }

}));

export default function RadioGroup(props) {

    const classes = useStyles();

    const { name, label, value, onChange, items } = props;

    return (
        <FormControl className={classes.root}>
            <FormLabel 
                className={classes.label}
            >
                {label}
            </FormLabel>

            <MuiRadioGroup 
                row
                name={name}
                value={value}
                onChange={onChange}>
                {
                    items.map(
                        item => (
                            <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
                        )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    )
}
