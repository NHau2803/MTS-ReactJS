import React, { useEffect, useState } from "react";
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
import studentApi from "../../../../api/studentApi";
import { useParams } from "react-router-dom";

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

    const { studentId } = useParams();

    const [studentInfo, setStudentInfo] = useState({});

    const fetchData = async () => {
    
        studentApi.info(studentId).then(res=>{
            console.log(studentId)
            console.log(res)
            setStudentInfo(res);
        });
    
    };

    // Trigger the fetchData after the initial render by using the useEffect hook
    useEffect(() => { fetchData(); }, []);
    
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
                    {renderRow(<ContactsIcon/>, "Code", studentInfo.code)}
                    {renderRowRight(<PersonIcon />, "Name", studentInfo.name)}
                    {renderRow(<WcIcon />, "Gender", studentInfo.gender)}
                    {renderRowRight(<DateRangeIcon />, "Birthday", studentInfo.birthday)}
                    {renderRow(<EmailIcon />, "Email", studentInfo.email)}
                    {renderRowRight(<PhoneIphoneIcon />, "Phone", studentInfo.phone)}
                    {renderRow(<ClassIcon />, "Faculty", studentInfo.facultyName)}
                </Paper>
                
            </Grid>
        </Grid>
        </div>
        
    );
}