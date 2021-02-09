import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import teamApi from 'api/Team/teamApi';
import { useParams } from 'react-router-dom';
import Input from 'custom-fields/Input';
import { Avatar, Grid, ListItemAvatar } from '@material-ui/core';
import { SET_BACKGROUND_COLOR_PRIMARY } from 'constants/color';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(1),
 //   width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  grid: {
    display: "flex",
    justifyContent: "center",
}
}));

export default function ViewTeamPage() {

  const classes = useStyles();
  const { teamId } = useParams();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [teamInfo, setTeamInfo] = useState({});

  const fetchData = async () => {
      teamApi.view(teamId).then(res=>{
          res.errorMessage
          ? setNotify({
              isOpen: true,
              message: res.errorMessage,
              type: 'error'
          })
          : setTeamInfo(res.result);            
      });
  };

  useEffect(() => { fetchData(); }, []);

  const renderRow = (icon, title, info) =>{
    return(
        <ListItem>
            <ListItemAvatar>
                <Avatar style={SET_BACKGROUND_COLOR_PRIMARY}>
                {icon}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={title} secondary={info} />
        </ListItem>
    );
  }

  console.log(teamInfo);
    

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item xs={12} sm={6}>
        <h1>TEAM 01</h1>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Basic</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography>
              
                {renderRow(<DraftsIcon />, "#"+teamInfo.id, "ID" )}
                {renderRow(<DraftsIcon />, teamInfo.name, "Team Name")}
                {renderRow(<DraftsIcon />, teamInfo.status, "Status")}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Submit</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Point</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Member</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {/* {teamInfo.students().map(item=>{
                  console.log(item);
                })} */}
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion disabled>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>Disabled Accordion</Typography>
            </AccordionSummary>

          </Accordion>
        </Grid>
      </Grid>
      
    </div>
  );
}
