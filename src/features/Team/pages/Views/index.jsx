import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Input from 'custom-fields/Input';
import teamApi from 'api/Team';
import { useParams } from 'react-router-dom';
import {  Grid } from '@material-ui/core';
import { formatDateTime, formatDate } from 'utils/converter';
import ButtonIcon from 'custom-fields/ButtonIcon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SaveIcon from '@material-ui/icons/Save';
import Notification from 'custom-fields/Notification';
import { set } from 'date-fns';


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
  const [edit, setEdit] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [link, setLink] = useState("");


  const fetchData = async () => {
      teamApi.view(teamId).then(res=>{
          if(res.errorMessage){
            setNotify({
              isOpen: true,
              message: res.errorMessage,
              type: 'error'
          })
          }else{
            setTeamInfo(res.result);
            setLink(teamInfo.link);
          }            
      });
  };

  useEffect(() => { fetchData(); }, []);   
  
  const accordionSummary = (title) =>{
    return (
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>{title}</Typography>
      </AccordionSummary>
    )
  }


  const onSubmitLink = () => {
    teamApi.submitLink(teamId, {
      id: teamId,
      link: link
    }).then(res=>{
      if(res.success){
          setNotify({
              isOpen: true,
              message: "Submit Successfully",
              type: "success"
          });
          // setLink(link); ?? refesh?
          
      }else{
          setNotify({
              isOpen: true,
              message: "Sorry, Submit Unsuccessfully",
              type: "error"
          });
      }
  });
   
  }

  const onClickIcon = () =>{

    if(edit){
      onSubmitLink();
      setEdit(!edit);
    }else{
      setEdit(!edit);
    }
    setIsFirst(false);
  }

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        <Grid item xs={12} sm={4}>
          <h1>{teamInfo.name || "Team Info"}</h1>

          <Accordion>
            {accordionSummary("Basic")}
            <AccordionDetails>
              <Typography component={'span'} variant={'body2'} align={"left"}>
                
                <li key={teamInfo.id}>{`ID : #${teamInfo.id || ""}`}</li>
                <li key={teamInfo.name}>{`Name : ${teamInfo.name || ""}`}</li>
                <li key={teamInfo.topicName}>{`Topic : ${teamInfo.topicName || ""}`}</li>
                <li key={teamInfo.status}>{`Status : ${teamInfo.status || ""}`}</li>

              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            {accordionSummary("Submit")}
            <AccordionDetails>
                <Input
                    name="link"
                    label="Submit link project"
                    fullWidth
                    value={isFirst ? teamInfo.link || "" : link || ""}
                    onChange={e => setLink(e.target.value)}
                    disabled={edit ? false : true}
                />
                <br/>                
                {
                  <ButtonIcon 
                    icon={edit ? <SaveIcon /> : <EditOutlinedIcon/>} 
                    onClick= {onClickIcon} />
                  
                }
            </AccordionDetails>
          </Accordion>

          <Accordion>
            {accordionSummary("Point")}
            <AccordionDetails>
              <b>{teamInfo.point || "No point yet!"}</b>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            {accordionSummary("Deadlines")}
            <AccordionDetails>
              <Typography component={'div'} variant={'body2'} align={"left"}>
                  {teamInfo.deadlines
                    ? teamInfo.deadlines.map(item => {
                        return <li key={item.count}>{`${item.count} | ${item.content} | ${formatDateTime(item.startDeadline)} to ${formatDateTime(item.endDeadline)}`}</li>
                      })
                    : "No deadlines yet." // !=[]
                  }
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            {accordionSummary("Member")}
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
        </Grid>
      </Grid>

      <Notification
        notify={notify}
        setNotify={setNotify}
    />
      
    </div>
  );
}
