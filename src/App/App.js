import React, { Suspense } from 'react';
import './App.css';
import 'components/Header'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from 'features/Login'
import Loader from 'components/Loader';
import NotFound from 'components/NotFound';
import RouteUser from 'routes/User';
import RouteAdmin from 'routes/Admin';

function App() {
  return (
    <div className="App">

      <Suspense fallback={<Loader />}>
        <BrowserRouter>

          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={RouteAdmin} />
            <Route path="/mts" component={RouteUser} />
            <Route component={NotFound} />
          </Switch>
          
        </BrowserRouter>

      </Suspense>
    </div>
  );
}

export default App;
