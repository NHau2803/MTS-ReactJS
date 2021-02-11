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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { SET_COLOR_PRIMARY } from "styles/Color";
import { useSideStyles } from "styles/Side";



const AccountSide = props => {

  const { history } = props;
  const classes = useSideStyles();

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const itemsList = [
    {
      text: "View",
      icon: <ViewListIcon style={SET_COLOR_PRIMARY}/>,
      onClick: () => history.push("/admin/account")
    },
  ];
  return (
      <div>

        <ListItem button onClick={handleClick}>

        <ListItemIcon>
          <AccountCircleIcon style={SET_COLOR_PRIMARY}/>
        </ListItemIcon>

        <ListItemText 
          primary="Account" 
          style={SET_COLOR_PRIMARY}
        />

        {open  
          ?<ExpandLess style={SET_COLOR_PRIMARY}/> 
          : <ExpandMore style={SET_COLOR_PRIMARY}
        />}

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
                {itemsList.map((item, index) => {

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
                      style={SET_COLOR_PRIMARY}
                    />
                </ListItem>
                );
            })}
            </List>
        </Collapse>
      </div>
  );
};

export default withRouter(AccountSide);