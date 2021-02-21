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
    const { history } = props;

    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("roles");

    const handleInputChange = e => {
        const { name, value } = e.target
        setAccount({
            ...account,
            [name]: value
        })
    }

    const handleLogin = e => {
        var axios = require('axios');
        var data = JSON.stringify(account);

        var config = {
            method: 'post',
            url: 'http://localhost:8090/login',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
        .then(function (res) {
            if(res.status === 200){
                setError(false);
                localStorage.setItem("accessToken", true);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("roles", res.data.roles);
                if(res.data.roles === "[TEACHER]"){
                    history.push('/admin');
                }if(res.data.roles === "[STUDENT]"){
                    history.push('/mts')
                }
            }
        })
        .catch(function (error) {
            setError(true);
        });
    }


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