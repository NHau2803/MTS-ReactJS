import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Checkbox, FormControlLabel, FormGroup, Grid, Paper, Typography } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { COLOR_PRIMARY, COLOR_PRIMARY_DARK, SET_BACKGROUND_COLOR_PRIMARY } from "constants/color";
import Input from "custom-fields/Input";
import Button from "custom-fields/Button";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto auto 1rem auto",
        flexGrow: 1,
    },
    grid: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(4),
    },
    pager:{
       padding: theme.spacing(4),
    },
    text: {
        color: COLOR_PRIMARY,
    },
    link: {
        textDecoration: "none",
        color: COLOR_PRIMARY,
        '&:hover': {
            transition: "all 0.5s ease-in-out 0s",
            color: COLOR_PRIMARY_DARK,
          },

    },
 
}));
export default function Login() {

    const classes = useStyles();

    return(
        <div className={classes.root}>
        <Grid container className={classes.grid} align='center'>
            <Grid item xs={12} sm={3}>
               
                <h1 className={classes.text}>MTS</h1>
                <Paper elevation={10} className={classes.pager}>
            
                    <Avatar style={SET_BACKGROUND_COLOR_PRIMARY}><LockOutlinedIcon/></Avatar>
                    <h2 className={classes.text}>Login</h2>
                    <FormGroup>
                        <Input
                            variant="standard"
                            label='Username'  
                            placeholder='Enter username'
                            fullWidth
                            required
                        >
                        </Input>
                        <br/>
                        <Input
                            variant="standard"
                            label='Password'  
                            placeholder='Enter password' 
                            type='password' 
                            fullWidth 
                            required
                        >
                        </Input>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="checked"
                                    color="default"
                                />
                            }
                            label="Remember me"
                        />
                        <br/>
                        <Button
                            type="submit"
                            text="Login"
                            startIcon={<ExitToAppIcon />}
                        // onClick={handleSubmit}
                            background = {SET_BACKGROUND_COLOR_PRIMARY}
                        />
                        <br/>
                        <Typography >
                            <Link to="#" className={classes.link}>
                                Forgot password ?
                            </Link>
                        </Typography>
                    </FormGroup>

                    {/* <Typography > Do you have an account ?
                        <Link href="#" >
                            Sign Up 
                    </Link>
                    </Typography> */}
                </Paper>
            </Grid>
        </Grid>
        </div>
        
    );
}