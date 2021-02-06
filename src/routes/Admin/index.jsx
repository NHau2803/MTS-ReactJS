import React, { Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Header from 'components/Header';
import Loader from 'components/Loader';
import NotFound from 'components/NotFound';

const Student = React.lazy(() => import('../../features/Student'));
const Teacher = React.lazy(() => import('../../features/Teacher'));
const HomePage = React.lazy(() => import('../../features/Home'));
const Topic = React.lazy(() => import('../../features/Topic'));
const Team = React.lazy(()=> import('../../features/Team'));

export default function RouteAdmin(props) {
  
  const match = useRouteMatch();  
  
  return (
    <div>
      <Suspense fallback={<Loader />}>
        
        <Header mode="ADMIN"/>
        <Switch>
            <Redirect exact from={match.url} to={`${match.url}/home`} />
            <Route path={`${match.url}/home`} component={HomePage} />
            <Route path={`${match.url}/student`} component={Student} />
            <Route path={`${match.url}/teacher`} component={Teacher} />
            <Route path={`${match.url}/topic`} component={Topic} />
            <Route path={`${match.url}/team`} component={Team} />
            <Route component={NotFound} />
        </Switch>

      </Suspense>
    </div>
   
    
  );
}
