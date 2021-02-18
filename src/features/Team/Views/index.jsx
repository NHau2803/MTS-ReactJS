import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import teamApi from 'api/Team';
import { useParams } from 'react-router-dom';
import Input from 'custom-fields/Input';
import { Avatar, Grid, ListItemAvatar } from '@material-ui/core';
import { SET_BACKGROUND_COLOR_PRIMARY } from 'styles/Color';
import { changeListToText, formatDateTime, formatDate,changeListMember } from 'utils/converter';

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
  },
  text: {
    marginLeft: 0,
    background: "red",
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

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item xs={12} sm={4}>
        <h1>{teamInfo.name}</h1>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Basic</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography component={'span'} variant={'body2'} align={"left"}>
                
                <li key={teamInfo.id}>{`ID : #${teamInfo.id}`}</li>
                <li key={teamInfo.name}>{`Name : ${teamInfo.name}`}</li>
                <li key={teamInfo.topicName}>{`Topic : ${teamInfo.topicName}`}</li>
                <li key={teamInfo.status}>{`Status : ${teamInfo.status}`}</li>

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
              <Typography className={classes.heading}>Deadlines</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component={'div'} variant={'body2'} align={"left"}>
                  {teamInfo.deadlines
                    ? teamInfo.deadlines.map(item => {
                        return <li key={item.count}>{`${item.count} | ${item.content} | ${formatDateTime(item.startDeadline)} to ${formatDateTime(item.endDeadline)}`}</li>
                      })
                    : "No member yet." // !=[]
                  }
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
              <Typography component={'div'} variant={'body2'} align={"left"}>
                  {teamInfo.students
                    ? teamInfo.students.map(item => {
                        return <li key={item.count}>{`${item.count} | ${item.studentName} | ${formatDate(item.timeJoin)}`}</li>
                      })
                    : "No member yet." // !=[]
                  }
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
