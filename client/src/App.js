import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Routes from './components/routing/Routes';
import Navbar from './components/layout/Navbar';
import Landing from './components/landing/Landing';
import { loadUser } from './redux/actions/auth';
import setAuthToken from './utils/setAuthToken';

const App = ({ loadUser }) => {
  console.log('[App]: rendering');

  useEffect(() => {
    setAuthToken(localStorage.token);
    loadUser();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route component={Routes} />
      </Switch>
    </BrowserRouter>
  );
}

export default connect(null, { loadUser })(App);
