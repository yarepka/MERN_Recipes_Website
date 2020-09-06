import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes from './components/routing/Routes';
import Navbar from './components/layout/Navbar';
import Landing from './components/landing/Landing';
import store from './store';

const App = () => {
  console.log('[App]: rendering');
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
