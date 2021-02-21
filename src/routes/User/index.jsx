import React, { Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Header from 'components/Header';
import Loader from 'components/Loader';
import NotFound from 'components/NotFound';

const InfoPage = React.lazy(() => import('../../features/Student/pages/Info'));
const HomePage = React.lazy(() => import('../../features/Home'));
const Topic = React.lazy(() => import('../../features/Topic'));
const MyTopic = React.lazy(() => import('../../features/Topic/pages/Table'));
const AddTeamPage = React.lazy(()=> import('../../features/Team/pages/AddEdit'));
const UpdateAccountPage = React.lazy(()=> import('../../features/Account/pages/Update'));

export default function RouteUser(props) {
  
  const match = useRouteMatch();  
 // const studentId = 1;
  
  return (
    <div>
      <Suspense fallback={<Loader />}>
        
        <Header mode="USER"/>
        <Switch>
            <Redirect exact from={match.url} to={`${match.url}/home`} />
            <Route path={`${match.url}/home`} component={HomePage} />
            <Route path={`${match.url}/topic`} component={Topic} />
            <Route path={`${match.url}/my/:studentId/view`} component={MyTopic} />
            <Route path={`${match.url}/info/:studentId`} component={InfoPage} /> 
            <Route path={`${match.url}/team/add`} component={AddTeamPage} /> 
            <Route path={`${match.url}/account`} component={UpdateAccountPage} /> 
            
            <Route component={NotFound} />
        </Switch>

      </Suspense>
    </div>
   
    
  );
}
