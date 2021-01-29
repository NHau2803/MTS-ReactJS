import React, { Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import AddEditPage from './pages/AddEdit';
import ProfilePage from './pages/Profile';
import TablePage from './pages/Table';

export default function Student(props) {
  const match = useRouteMatch();
  
  return (
    <div>
      <Suspense fallback={Loading}>
        <Switch>
        <Route exact path={match.url} component={TablePage} />

        <Route exact path={`${match.url}/add`} component={AddEditPage} />
        <Route path={`${match.url}/:studentId/profile`} component={ProfilePage} />
        <Route path={`${match.url}/:studentId`} component={AddEditPage} />

        <Route component={NotFound} />
        </Switch>
      </Suspense>
    </div>
   
    
  );
}
