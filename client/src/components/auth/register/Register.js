import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../../layout/Spinner';
import { register } from '../../../redux/actions/userActions';
import { setAlert } from '../../../redux/actions/alertActions';
import { ALERT_RESET, USER_REGISTER_RESET } from '../../../redux/actions/types';

import './Register.css';
import FileInput from '../../layout/FileInput';

const Register = ({ history, location }) => {
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading } = userRegister;

  if (userInfo) {
    if (redirect) {
      history.push(redirect);
    } else {
      history.goBack();
    }
  }

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
      const file = e.target.files[0];
      if (file.type.split('/')[0] === 'image') {
        setImage(file);
      } else {
        setImage('');
        dispatch(setAlert('You can only use image files', 'danger'));
      }
    },
    [image]
  );

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
      dispatch(setAlert('Invalid password', 'danger'));
    } else if (password !== confirmPassword) {
      dispatch(setAlert('Passwords do not match', 'danger'));
    } else {
      console.log(name, email, password, image);
      dispatch(
        register({
          name: name,
          email: email,
          password: password,
          image: image,
        })
      );
    }
  };

  useEffect(() => {
    return () => {
      dispatch({ type: ALERT_RESET });
      dispatch({ type: USER_REGISTER_RESET });
    };
  }, []);

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

        {loading && <Spinner />}

        <button type='submit' className='btn btn-primary block-on-mobile'>
          Register
        </button>
      </form>
      <p className='my-1'>
        Already have an account?{' '}
        <Link to={`/login?redirect=${redirect}`}>Sign In</Link>
      </p>
    </Fragment>
  );
};

export default Register;
