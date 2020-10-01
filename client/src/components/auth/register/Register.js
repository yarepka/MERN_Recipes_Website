import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './Register.css';
import { setAlert, removeAllAlerts } from '../../../redux/actions/alert';
import { register } from '../../../redux/actions/auth';
import FileInput from '../../layout/FileInput';

const Register = ({
  setAlert,
  removeAllAlerts,
  register,
  isAuthenticated,
  history,
  alerts,
}) => {
  console.log('[Register]: rendering');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onNameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const onConfirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onImageChangeHandler = useCallback(
    (e) => {
      setImage(e.target.files[0]);
    },
    [image]
  );

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
      setAlert('Invalid password', 'danger');
    } else if (password !== confirmPassword) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name: name,
        email: email,
        password: password,
        image: image,
      });
    }
  };

  useEffect(() => {
    if (alerts.length > 0) removeAllAlerts();
  }, []);

  useEffect(() => {
    if (isAuthenticated) history.goBack();
  }, [isAuthenticated]);

  return (
    <Fragment>
      <h1 className='text-large text-success'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <div className='alert'>
        <p className='title'>Password must:</p>
        <ul className='unordered'>
          <li>Contain at least 8 characters</li>
          <li>Contain at least 1 number</li>
          <li>Contain at least 1 lowercase character (a-z)</li>
          <li>Contain at least 1 uppercase character (A-Z)</li>
          <li>Contain only numbers and letters</li>
        </ul>
      </div>
      <form className='register-form' onSubmit={onSubmitHandler}>
        <div className='inputs'>
          <div className='left'>
            <FileInput image={image} imageHandler={onImageChangeHandler} />
          </div>

          <div className='right'>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={onNameChangeHandler}
                required
              />
            </div>

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
                minLength='8'
                value={password}
                onChange={onPasswordChangeHandler}
              />
            </div>

            <div className='form-group'>
              <input
                type='password'
                placeholder='Confirm Password'
                minLength='6'
                value={confirmPassword}
                onChange={onConfirmPasswordChangeHandler}
              />
            </div>
          </div>
        </div>

        <input
          type='submit'
          value='Register'
          className='btn btn-primary block-on-mobile'
        />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  alerts: state.alert,
});

export default connect(mapStateToProps, {
  setAlert,
  removeAllAlerts,
  register,
})(Register);
