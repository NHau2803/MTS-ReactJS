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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ViewListIcon from '@material-ui/icons/ViewList';
import PersonIcon from '@material-ui/icons/Person';
import { SET_COLOR_TEAL } from "constant/color";

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

const StudentSide = props => {

  const { history } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const itemsList = [
    {
      text: "View",
      icon: <ViewListIcon style={SET_COLOR_TEAL}/>,
      onClick: () => history.push("/admin/student")
    },
    {
      text: "Add",
      icon: <PersonAddIcon style={SET_COLOR_TEAL}/>,
      onClick: () => history.push("/admin/student/add")
    },

  ];
  return (
      <div>

        <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <PersonIcon style={SET_COLOR_TEAL}/>
        </ListItemIcon>

        <ListItemText 
          primary="Student" 
          style={SET_COLOR_TEAL} 
        />

        {open 
        ? <ExpandLess style={SET_COLOR_TEAL}/> 
        : <ExpandMore style={SET_COLOR_TEAL}/>
        }

        </ListItem>
          <Collapse 
            in={open} 
            timeout="auto" 
            unmountOnExit
          >
            <List 
              component="div" 
              disablePadding
            >
                {itemsList.map((item) => {

                const { text, icon, onClick } = item;

                return (
                <ListItem 
                  className={classes.nested} 
                  button key={text} 
                  onClick={onClick}
                  >
                    {icon 
                    && <ListItemIcon>{icon}</ListItemIcon>
                    }

                    <ListItemText 
                      primary={text} 
                      style={SET_COLOR_TEAL}
                    />
                </ListItem>
                );
            })}
            </List>
        </Collapse>
      </div>
  );
};

export default withRouter(StudentSide);