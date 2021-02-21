import React, { Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Header from 'components/Header';
import Loader from 'components/Loader';
import NotFound from 'components/NotFound';

const Student = React.lazy(() => import('../../features/Student'));
const Teacher = React.lazy(() => import('../../features/Teacher'));
const HomePage = React.lazy(() => import('../../features/Home'));
const AnalysisPage = React.lazy(() => import('../../features/Chart/Analysis'));
const Topic = React.lazy(() => import('../../features/Topic'));
const Team = React.lazy(()=> import('../../features/Team'));
const Account = React.lazy(()=> import('../../features/Account'));

export default function RouteAdmin(props) {
  
  const match = useRouteMatch();  

  const isAdmin = () => {
    return localStorage.getItem("roles") === "[ADMIN]"
  }
  const isTeacher = () => {
    console.log(localStorage.getItem("roles") === "[TEACHER]")
    return localStorage.getItem("roles") === "[TEACHER]"
  }
  
  return (
    <div>
      <Suspense fallback={<Loader />}>
        
        <Header mode="SIDEBAR_ADMIN"/>
        <Switch>
            <Redirect exact from={match.url} to={`${match.url}/home`} />
            <Route path={`${match.url}/home`} component={HomePage} />

            <Route path={`${match.url}/analysis`} render={()=>{
                return (isAdmin() || isTeacher())? <AnalysisPage /> : <NotFound />
            }} />

            <Route path={`${match.url}/student`} render={()=>{
                return (isAdmin() || isTeacher())? <Student /> : <NotFound />
            }} />

            <Route path={`${match.url}/teacher`} render={()=>{
                return (isAdmin() || isTeacher())? <Teacher /> : <NotFound />
            }} />

            <Route path={`${match.url}/topic`} render={()=>{
                return (isAdmin() || isTeacher())? <Topic /> : <NotFound />
            }} />

            <Route path={`${match.url}/team`} render={()=>{
                return (isAdmin() || isTeacher())? <Team /> : <NotFound />
            }} />

            <Route path={`${match.url}/account`} render={()=>{
                return (isAdmin() || isTeacher())? <Account /> : <NotFound />
            }} />

            <Route component={NotFound} />
        </Switch>

      </Suspense>
    </div>
   
    
  );
}
