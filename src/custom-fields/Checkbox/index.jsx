import React from 'react'
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';
import { SET_COLOR_PRIMARY } from 'styles/Color';

export default function Checkbox(props) {

    const { name, label, value, disabled, onChange } = props;

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl>
            <FormControlLabel
                label={label}

                control=
                {
                <MuiCheckbox
                    name={name}
                    color="primary"
                    checked={value}
                    disabled={disabled}
                    onChange={e => 
                        onChange(convertToDefEventPara(name, e.target.checked))
                    }
                    style={SET_COLOR_PRIMARY}
                />}
            />
        </FormControl>
    )
}