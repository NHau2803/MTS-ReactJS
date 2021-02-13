import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText, Paper } from "@material-ui/core";
import DateRangeIcon from '@material-ui/icons/DateRange';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import ClassIcon from '@material-ui/icons/Class';
import ContactsIcon from '@material-ui/icons/Contacts';
import WcIcon from '@material-ui/icons/Wc';
import { SET_BACKGROUND_COLOR_PRIMARY } from "styles/Color";
import studentApi from "api/Student";
import Notification from "custom-fields/Notification";
import { formatDate } from "utils/converter";
import { useInfoStyles } from "styles/Info";


export default function InfoPage() {

    const classes = useInfoStyles();
    const { studentId } = useParams();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [studentInfo, setStudentInfo] = useState({});

    const fetchData = async () => {
        if(studentId !== undefined){
            studentApi.info(studentId).then(res=>{
                res.errorMessage
                ? setNotify({
                    isOpen: true,
                    message: res.errorMessage,
                    type: 'error'
                })
                : setStudentInfo(res.result);            
            });
        }else{
            setNotify({
                isOpen: true,
                message: "Sory, Not Found",
                type: 'error'
            })
            setStudentInfo([]); 
        }
      
    };

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
                    {renderRowRight(<DateRangeIcon />, "Birthday", formatDate(studentInfo.birthday))}
                    {renderRow(<EmailIcon />, "Email", studentInfo.email)}
                    {renderRowRight(<PhoneIphoneIcon />, "Phone", studentInfo.phone)}
                    {renderRow(<ClassIcon />, "Faculty", studentInfo.facultyName)}
                </Paper>
                
            </Grid>
        </Grid>
        <Notification
            notify={notify}
            setNotify={setNotify}
        />
        </div>
        
    );
}