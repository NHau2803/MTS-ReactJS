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
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import SchoolIcon from '@material-ui/icons/School';
import { SET_BACKGROUND_COLOR_PRIMARY } from "styles/Color";
import teacherApi from "api/Teacher";
import { useInfoStyles } from "styles/Info";
import { formatDate } from "utils/converter";

export default function InfoPage() {

    const classes = useInfoStyles();
    const { teacherId } = useParams();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [teacherInfo, setTeacherInfo] = useState({});

    const fetchData = async () => {
        teacherApi.info(teacherId).then(res=>{
            res.errorMessage
            ? setNotify({
                isOpen: true,
                message: res.errorMessage,
                type: 'error'
            })
            : setTeacherInfo(res.result);            
        });
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
                    
                    <h1 className={classes.title}>Teacher Info</h1>
                    {renderRow(<ContactsIcon/>, "Code", teacherInfo.code)}
                    {renderRowRight(<PersonIcon />, "Name", teacherInfo.name)}
                    {renderRow(<WcIcon />, "Gender", teacherInfo.gender)}
                    {renderRowRight(<DateRangeIcon />, "Birthday", formatDate(teacherInfo.birthday))}
                    {renderRow(<EmailIcon />, "Email", teacherInfo.email)}
                    {renderRowRight(<PhoneIphoneIcon />, "Phone", teacherInfo.phone)}
                    {renderRow(<SchoolIcon />, "Academy", teacherInfo.academyName)}
                    {renderRowRight(<WorkOutlineIcon />, "Position", teacherInfo.positionName)}
                    {renderRow(<ClassIcon />, "Faculty", teacherInfo.facultyName)}
                    
                </Paper>
                
            </Grid>
        </Grid>
        </div>
        
    );
}