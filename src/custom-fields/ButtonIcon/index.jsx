import React from 'react'
import { Button, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(1),
    },
}))

export default function ButtonIcon(props) {

    const { icon, color, background, size, onClick, disabled, ...other} = props;
    const classes = useStyles();

    return (
        <Button
            className={classes.root}
            startIcon={icon}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            disabled={disabled}
            {...other}
        />
    )
}
