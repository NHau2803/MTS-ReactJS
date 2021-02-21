import React from "react";
import { List } from "@material-ui/core";
import HomeSide from "./components/HomeSide";
import TeacherSide from "./components/TeacherSide";
import StudentSide from "./components/StudentSide";
import TopicSide from "./components/TopicSide";
import AccountSide from "./components/AccountSide";
import TeamSide from "./components/TeamSide";
import AnalysisSide from "./components/AnalysisSide";


export default function SideBar() {

  return (
    <div>
      <List>
        <HomeSide />
        <AnalysisSide />
        <TeacherSide />
        <StudentSide />
        <TeamSide />
        <TopicSide />
        <AccountSide />
        
      </List>
    </div>
  );
};
