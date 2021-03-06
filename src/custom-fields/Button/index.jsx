import React from 'react'
import { Button as MuiButton, makeStyles } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}))

export default function Button(props) {

    const { text, size, color, background, icon, variant, onClick, disabled, ...other } = props
    const classes = useStyles();

    return (
        <MuiButton
            classes={{ root: classes.root, label: classes.label }}
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            style={background}
            onClick={onClick}
            startIcon={icon}
            disabled={disabled}
            {...other}
        >
            {text}
        </MuiButton>
    )
}
