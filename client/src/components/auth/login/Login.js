import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css';

const Login = () => {
  console.log("[Login]: rendering");
  return (
    <div>
      <div className="alert">
        Invalid Credentials
      </div>

      <h1 className="text-large text-success">
        Sign In
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into your account</p>
      <form action="dashboard.html" className="form">
        <div className="form-group">
          <input type="email" placeholder="Email Address" />
        </div>

        <div className="form-group">
          <input type="password" placeholder="Password" minLength="6" />
        </div>

        <input type="submit" value="Login" className="btn btn-primary block-on-mobile" />
      </form>

      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;