import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions/auth';

import './Login.css';

const Login = ({ login, isAuthenticated, history }) => {
  console.log("[Login]: rendering");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  }

  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    login({ email, password });
  }

  if (isAuthenticated) {
    // return <Redirect to='/' />
    history.goBack();
  }

  return (
    <div>
      <h1 className="text-large text-success">
        Sign In
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into your account</p>
      <form action="dashboard.html" className="form" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} onChange={onEmailChangeHandler} />
        </div>

        <div className="form-group">
          <input type="password" placeholder="Password" minLength="6" value={password} onChange={onPasswordChangeHandler} />
        </div>

        <input type="submit" value="Login" className="btn btn-primary block-on-mobile" />
      </form>

      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);