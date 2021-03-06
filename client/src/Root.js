import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './redux/reducers/index';

// Get User information from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

export default ({
  children,
  initialState = {
    userLogin: { userInfo: userInfoFromStorage },
  },
}) => {
  const middleware = [thunk];

  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  return <Provider store={store}>{children}</Provider>;
};
