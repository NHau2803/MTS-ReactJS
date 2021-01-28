import React from "react";
import {
    ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';


const HomeSide = props => {
    const { history } = props;
    
    return (
        <div>
        <ListItem button onClick={() => history.push("/home")}>
            <ListItemIcon>
            <HomeIcon />
            </ListItemIcon>

            <ListItemText primary="Home" />
        </ListItem>
        
        </div>
    );
};

export default withRouter(HomeSide);