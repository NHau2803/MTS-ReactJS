import React, { Suspense } from 'react';
import Header from '../components/Header';
import './App.css';
import '../components/Header'
import NotFound from '../components/NotFound';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Loader from '../components/Loader';
import Login from '../features/Login';
import RouteAdmin from '../features/RouteAdmin';

function App() {
  return (
    <div className="App">

      <Suspense fallback={<Loader />}>
        <BrowserRouter>

          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/login" component={Login} />
            <Route path="/admin" component={RouteAdmin} />
            <Route component={NotFound} />
          </Switch>
          
        </BrowserRouter>

      </Suspense>
    </div>
  );
}

export default App;
