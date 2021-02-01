import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText, Paper } from "@material-ui/core";
import { STUDENT1 } from "../../../../constant/dataDemo";
import { COLOR_PRIMARY, COLOR_WHITE, SET_BACKGROUND_COLOR_PRIMARY } from "../../../../constant/color";
import DateRangeIcon from '@material-ui/icons/DateRange';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import ClassIcon from '@material-ui/icons/Class';
import ContactsIcon from '@material-ui/icons/Contacts';
import WcIcon from '@material-ui/icons/Wc';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "5rem auto 1rem auto",
        flexGrow: 1,
    },
    grid: {
        display: "flex",
        justifyContent: "center",
        padding: theme.spacing(1),
       
    },
    pager:{
        padding: theme.spacing(0.5),
    },
    title:{
        background: COLOR_PRIMARY,
        color: COLOR_WHITE,
        borderRadius: theme.spacing(0.5)
    },
    left: {
        textAlign: "left",
        paddingLeft : "10%",
    },
    right: {
        textAlign: "left",
        paddingLeft : "50%",
     
    }
}));
export default function InfoPage() {

    const classes = useStyles();

    const student = {
        "code": "197XD51241",
        "name": "Huỳnh Trọng Chí",
        "gender": "MALE",
        "birthday": "03-02-1997",
        "email": "197XD51241@gmail.com",
        "phone": "0966966387",
        "facultyName": "Quản trị kinh doanh"
        }
    
    const renderRow = (icon, title, info) =>{
        return(
            <ListItem className={classes.left}>
                <ListItemAvatar>
                    <Avatar style={SET_BACKGROUND_COLOR_PRIMARY}>
                    {icon}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={title} secondary={info} />
            </ListItem>
        );
    }

    const renderRowRight = (icon, title, info) =>{
        return(
            <ListItem className={classes.right}>
                <ListItemAvatar>
                    <Avatar style={SET_BACKGROUND_COLOR_PRIMARY}>
                    {icon}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={title} secondary={info} />
            </ListItem>
        );
    }

    return(
        <div className={classes.root}>
        <Grid container className={classes.grid}>
            <Grid item xs={12} sm={4}>
                <Paper elevation={4} className={classes.pager}>
                    
                    <h1 className={classes.title}>Student Info</h1>
                    {renderRow(<ContactsIcon/>, "Code", "197XD51241")}
                    {renderRowRight(<PersonIcon />, "Name", "Huỳnh Trọng Chí")}
                    {renderRow(<WcIcon />, "Gender", "MALE")}
                    {renderRowRight(<DateRangeIcon />, "Birthday", "03-02-1997")}
                    {renderRow(<EmailIcon />, "Email", "197XD51241@gmail.com")}
                    {renderRowRight(<PhoneIphoneIcon />, "Phone", "0966966387")}
                    {renderRow(<ClassIcon />, "Faculty", "Quản trị kinh doanh")}
                </Paper>
                
            </Grid>
        </Grid>
        </div>
        
    );
}