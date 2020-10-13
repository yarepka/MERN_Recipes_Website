import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../../layout/Spinner';
import { ALERT_RESET } from '../../../redux/actions/types';
import { login } from '../../../redux/actions/userActions';

import './Login.css';

const Login = ({ location, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading } = userLogin;

  const redirect = location.search && location.search.split('=')[1];

  if (userInfo) {
    if (redirect) {
      history.push(redirect);
    } else {
      history.goBack();
    }
  }

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
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    return () => {
      dispatch({ type: ALERT_RESET });
    };
  }, []);

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

        {loading && <Spinner />}

        <button type='submit' className='btn btn-primary block-on-mobile'>
          Login
        </button>
      </form>

      <p className='my-1'>
        Don't have an account?{' '}
        <Link to={`/register?redirect=${redirect}`}>Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
