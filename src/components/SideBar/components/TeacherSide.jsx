import React from "react";
import {
  ListItem,
  List,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Collapse from '@material-ui/core/Collapse';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ViewListIcon from '@material-ui/icons/ViewList';
import PersonIcon from '@material-ui/icons/Person';
import { SET_COLOR_PURPLE } from "styles/Color";
import { useSideStyles } from "styles/Side";


const TeacherSide = props => {

  const { history } = props;
  const classes = useSideStyles();

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const itemsList = [
    {
      text: "View",
      icon: <ViewListIcon style={SET_COLOR_PURPLE}/>,
      onClick: () => history.push("/admin/teacher")
    },
    {
      text: "Add",
      icon: <PersonAddIcon style={SET_COLOR_PURPLE}/>,
      onClick: () => history.push("/admin/teacher/add")
    },

  ];
  return (
      <div>
        <ListItem button onClick={handleClick}>

        <ListItemIcon>
          <PersonIcon style={SET_COLOR_PURPLE}/>
        </ListItemIcon>

        <ListItemText 
          primary="Teacher" 
          style={SET_COLOR_PURPLE}
        />

        {open 
        ? <ExpandLess style={SET_COLOR_PURPLE}/> 
        : <ExpandMore style={SET_COLOR_PURPLE}/>
        }

        </ListItem>

          <Collapse 
            in={open} 
            timeout="auto" 
            unmountOnExit
          >
            <List component="div" disablePadding>
                {itemsList.map((item,) => {

                const { text, icon, onClick } = item;

                return (
                <ListItem className={classes.nested} button key={text} onClick={onClick}>
                    {icon 
                    && <ListItemIcon>{icon}</ListItemIcon>
                    }
                    <ListItemText 
                      primary={text}  
                      style={SET_COLOR_PURPLE}
                    />
                </ListItem>
                );
            })}
            </List>
        </Collapse>
      </div>
  );
};

export default withRouter(TeacherSide);