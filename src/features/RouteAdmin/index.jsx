import React, { Suspense } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import NotFound from '../../components/NotFound';

const Student = React.lazy(() => import('../Student'));
const HomePage = React.lazy(() => import('../Home'));


export default function RouteAdmin(props) {
  
  const match = useRouteMatch();  
  
  return (
    <div>
      <Suspense fallback={<Loader />}>
        
        <Header />
        <Switch>
            <Redirect exact from={match.url} to={`${match.url}/home`} />
            <Route path={`${match.url}/home`} component={HomePage} />
            <Route path={`${match.url}/student`} component={Student} />
            <Route component={NotFound} />
        </Switch>

      </Suspense>
    </div>
   
    
  );
}
