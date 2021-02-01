import React, { Suspense } from 'react';
import Header from '../components/Header';
import './App.css';
import '../components/Header'
import NotFound from '../components/NotFound';
import HomePage from '../features/Home';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Loader from '../components/Loader';

const Student = React.lazy(() => import('../features/Student'));

function App() {
  return (
    <div className="App">

      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Header />
        
          <Switch>
            <Redirect exact from="/" to="/home" />

            <Route path="/home" component={HomePage} />
            <Route path="/student" component={Student} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>

      </Suspense>
    </div>
  );
}

export default App;
