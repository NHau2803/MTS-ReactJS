import React, { Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Loader from 'components/Loader';
import NotFound from 'components/NotFound';

const TablePage = React.lazy(() => import("./pages/Table"));
const AddEditPage = React.lazy(() => import("./pages/AddEdit"));
const TableTeamsPage = React.lazy(() => import("../Team/Table"));
const ViewTeamPage =  React.lazy(() => import("../Team/Views"))

export default function Topic(props) {
  
  const match = useRouteMatch();  
  
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Switch>
        
        <Route exact path={match.url} component={TablePage} />
        <Route exact path={`${match.url}/add`} component={AddEditPage} />
        <Route exact path={`${match.url}/:topicId/view`} component={TableTeamsPage} />
        <Route path={`${match.url}/:topicId/view/:teamId/view`} component={ViewTeamPage} />
        <Route path={`${match.url}/:topicId`} component={AddEditPage} />
        
        <Route component={NotFound} />
        </Switch>
      </Suspense>
    </div>
   
    
  );
}
