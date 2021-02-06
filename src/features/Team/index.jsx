import React, { Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Loader from 'components/Loader';
import NotFound from 'components/NotFound';

const TablePage = React.lazy(() => import("./Table"));
const AddEditPage = React.lazy(() => import("./AddEdit"));

export default function Team(props) {
  
  const match = useRouteMatch();  
  
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Switch>
        
        <Route exact path={match.url} component={TablePage} />
        <Route exact path={`${match.url}/add`} component={AddEditPage} />
        <Route path={`${match.url}/:teamId`} component={AddEditPage} />

        <Route component={NotFound} />
        </Switch>
      </Suspense>
    </div>
   
    
  );
}
