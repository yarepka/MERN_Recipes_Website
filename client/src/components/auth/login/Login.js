import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions/auth';
import { removeAllAlerts } from '../../../redux/actions/alert';

import './Login.css';

const Login = ({
  alerts,
  login,
  removeAllAlerts,
  isAuthenticated,
  history,
}) => {
  console.log('[Login]: rendering');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  useEffect(() => {
    if (alerts.length > 0) removeAllAlerts();
  }, []);

  useEffect(() => {
    if (isAuthenticated) history.goBack();
  }, [isAuthenticated]);

  return (
    <div>
      <h1 className='text-large text-success'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign into your account
      </p>
      <form action='dashboard.html' className='form' onSubmit={onSubmitHandler}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={onEmailChangeHandler}
          />
        </div>

        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            minLength='6'
            value={password}
            onChange={onPasswordChangeHandler}
          />
        </div>

        <input
          type='submit'
          value='Login'
          className='btn btn-primary block-on-mobile'
        />
      </form>

      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  alerts: state.alert,
});

export default connect(mapStateToProps, { login, removeAllAlerts })(Login);
