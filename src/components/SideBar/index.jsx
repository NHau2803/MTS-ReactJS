import React from "react";
import { List } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import { withRouter } from "react-router-dom";
import StudentSide from "./components/StudentSide";
import TeacherSide from "./components/TeacherSide";
import TeamSide from "./components/TeamSide";
import TopicSide from "./components/TopicSide";
import AccountSide from "./components/AccountSide";
import HomeSide from "./components/HomeSide";

// const useStyles = makeStyles((theme) => ({
 
// }));

export default function SideBar() {

  return (
    <div>
      <List>
        <HomeSide />
        
        <TeacherSide />
        <StudentSide />
        <TeamSide />
        <TopicSide />
        <AccountSide />
        
      </List>
    </div>
  );
};
