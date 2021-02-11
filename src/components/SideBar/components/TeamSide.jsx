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
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import { SET_COLOR_AMBER } from "styles/Color";
import { useSideStyles } from "styles/Side";


const TeamSide = props => {

  const { history } = props;
  const classes = useSideStyles();

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const itemsList = [
    {
      text: "View",
      icon: <ViewListIcon style={SET_COLOR_AMBER}/>,
      onClick: () => history.push("/admin/team")
    },
    {
      text: "Add",
      icon: <GroupAddIcon style={SET_COLOR_AMBER}/>,
      onClick: () => history.push("/admin/team/add")
    },

  ];
  return (
      <div>

        <ListItem button onClick={handleClick}>

        <ListItemIcon>
          <GroupWorkIcon style={SET_COLOR_AMBER}/>
        </ListItemIcon>

        <ListItemText 
          primary="Team" 
          style={SET_COLOR_AMBER}
        />
        
        {open 
          ? <ExpandLess style={SET_COLOR_AMBER}/> 
          : <ExpandMore style={SET_COLOR_AMBER}/>
        }
        
        </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {itemsList.map((item) => {

                const { text, icon, onClick } = item;

                return (

                <ListItem 
                  className={classes.nested} 
                  button key={text} 
                  onClick={onClick}>
                  {icon && 
                    <ListItemIcon>{icon}</ListItemIcon>
                  }
                    <ListItemText 
                      primary={text} 
                      style={SET_COLOR_AMBER}
                    />
                </ListItem>
                );
            })}
            </List>
        </Collapse>
      </div>
  );
};

export default withRouter(TeamSide);