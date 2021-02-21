import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { SET_COLOR_BLUESGREY } from "styles/Color";
import EqualizerIcon from '@material-ui/icons/Equalizer';


const AnalysisSide = props => {
    const { history } = props;
    
    return (
        <div>
        <ListItem button onClick={() => history.push("/admin/analysis")}>
            <ListItemIcon>
                <EqualizerIcon style={SET_COLOR_BLUESGREY}/>
            </ListItemIcon>

            <ListItemText primary="Analysis" style={SET_COLOR_BLUESGREY}/>
        </ListItem>
        
        </div>
    );
};

export default withRouter(AnalysisSide);