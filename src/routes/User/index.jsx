import React, { Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Header from 'components/Header';
import Loader from 'components/Loader';
import NotFound from 'components/NotFound';

const AccountPage = React.lazy(() => import('../../features/Student/pages/Account'));
const InfoPage = React.lazy(() => import('../../features/Student/pages/Info'));
const HomePage = React.lazy(() => import('../../features/Home'));
const Topic = React.lazy(() => import('../../features/Topic'));
const AddTeamPage = React.lazy(()=> import('../../features/Team/AddEdit'));

export default function RouteUser(props) {
  
  const match = useRouteMatch();  
  
  return (
    <div>
      <Suspense fallback={<Loader />}>
        
        <Header mode="USER"/>
        <Switch>
            <Redirect exact from={match.url} to={`${match.url}/home`} />
            <Route path={`${match.url}/home`} component={HomePage} />
            <Route path={`${match.url}/topic`} component={Topic} />
            <Route path={`${match.url}/info`} component={InfoPage} /> 
            <Route path={`${match.url}/account`} component={AccountPage} /> 
            <Route path={`${match.url}/team/add`} component={AddTeamPage} /> 
            {/* get in localStoges */}
            
            <Route component={NotFound} />
        </Switch>

      </Suspense>
    </div>
   
    
  );
}
