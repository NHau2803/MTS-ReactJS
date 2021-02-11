import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Checkbox, FormControlLabel, FormGroup, Grid, Paper, Typography } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { SET_BACKGROUND_COLOR_PRIMARY } from "styles/Color";
import Input from "custom-fields/Input";
import Button from "custom-fields/Button";
import { useLoginStyles } from "styles/Login";


export default function Login(props) {

    const classes = useLoginStyles();
    const [account, setAccount] = useState({"username": "", "password": ""});
    const [error, setError] = useState(false);
    const {history} = props;

    const handleInputChange = e => {
        const { name, value } = e.target
        setAccount({
            ...account,
            [name]: value
        })
    }
    const handleLogin = e => {
        if(account.username == "admin" && account.password =="admin"){
            setError(false);
            history.push('/admin');
        }
        if(account.username == "hau.197ct31311" && account.password =="197ct31311"){
            history.push('/mts')
        }else{
            setError(true);
        }
    }

    // const handleLogin = e => {
    //     const url = 'http://localhost:8090/login';  
    //     axios.post(url, account).then(res=>{
    //         console.log(res.status);
    //     }).catch(error=>{
    //         console.log(error)
    //     })
    // }


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
                            name="username"
                            value={account.username}
                            onChange={handleInputChange}
                            placeholder='Enter username'
                            fullWidth
                            required
                            error={error ? "incorrect" : null}
                        >
                        </Input>
                        <br/>
                        <Input
                            variant="standard"
                            name="password"
                            placeholder='Enter password' 
                            label='Password' 
                            value={account.password}
                            onChange={handleInputChange}
                            type='password' 
                            fullWidth 
                            required
                            error={error ? "incorrect" : null}
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
                            onClick={handleLogin}
                            background = {SET_BACKGROUND_COLOR_PRIMARY}
                        />
                        <br/>
                        <Typography >
                            <Link to="#" className={classes.link}>
                                Forgot password ?
                            </Link>
                        </Typography>
                    </FormGroup>

                </Paper>
            </Grid>
        </Grid>
        </div>
        
    );
}