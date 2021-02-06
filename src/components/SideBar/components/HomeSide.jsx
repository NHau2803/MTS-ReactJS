import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import { SET_COLOR_PRIMARY } from "constant/color";


const HomeSide = props => {
    const { history } = props;
    
    return (
        <div>
        <ListItem button onClick={() => history.push("/admin/home")}>
            <ListItemIcon>
                <HomeIcon style={SET_COLOR_PRIMARY}/>
            </ListItemIcon>

            <ListItemText primary="Home" style={SET_COLOR_PRIMARY}/>
        </ListItem>
        
        </div>
    );
};

export default withRouter(HomeSide);