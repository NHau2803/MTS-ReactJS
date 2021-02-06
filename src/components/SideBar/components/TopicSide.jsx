import React from "react";
import {
  ListItem,
  List,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Collapse from '@material-ui/core/Collapse';
import ViewListIcon from '@material-ui/icons/ViewList';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { SET_COLOR_RED } from "constant/color";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const TopicSide = props => {

  const { history } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const itemsList = [
    {
      text: "View",
      icon: <ViewListIcon style={SET_COLOR_RED}/>,
      onClick: () => history.push("/admin/topic")
    },
    {
      text: "Add",
      icon: <NoteAddIcon style={SET_COLOR_RED}/>,
      onClick: () => history.push("/admin/topic/add")
    },

  ];
  return (
      <div>
        <ListItem button onClick={handleClick}>

        <ListItemIcon>
          <AssignmentIcon style={SET_COLOR_RED}/>
        </ListItemIcon>

        <ListItemText 
          primary="Topic" 
          style={SET_COLOR_RED}
        />
        
        {open ? 
          <ExpandLess style={SET_COLOR_RED}/> : 
          <ExpandMore style={SET_COLOR_RED}/>
        }

        </ListItem>
          <Collapse 
            in={open} 
            timeout="auto" 
            unmountOnExit
          >
            <List component="div" disablePadding>
                {itemsList.map((item) => {

                const { text, icon, onClick } = item;

                return (
                <ListItem 
                  className={classes.nested} 
                  button key={text} 
                  onClick={onClick}
                  >
                    {icon && 
                      <ListItemIcon>{icon}</ListItemIcon>
                    }
                    <ListItemText 
                      primary={text} 
                      style={SET_COLOR_RED}
                    />
                </ListItem>
                );
            })}
            </List>
        </Collapse>
      </div>
  );
};

export default withRouter(TopicSide);