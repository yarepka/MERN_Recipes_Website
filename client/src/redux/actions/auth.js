import axios from 'axios';

import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT
} from './types';
import setAuthToken from '../../utils/setAuthToken';

// Load user
export const loadUser = () => {
  return async dispatch => {
    // if we have token in localStoreas, we put it in a global 
    // header, so it'll always be send
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  }
}


// Register User
export const register = ({ name, email, password, image }) => {
  return async dispatch => {
    const formData = new FormData();
    const config = {
      header: {
        'Content-Type': 'multipart/form-data'
      }
    };

    formData.append('file', image);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('name', name);

    try {
      const res = await axios.post('/api/users', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({ type: REGISTER_FAIL });
    }
  }
};

// Login user
export const login = ({ email, password }) => {
  return async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post('/api/auth', body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      dispatch(loadUser());
    } catch (err) {

      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: LOGIN_FAIL
      });
    }
  };
}

// Logout 
export const logout = () => {
  return dispatch => {
    delete axios.defaults.headers.common['x-auth-token'];
    dispatch({ type: LOGOUT });
  }
}