import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

const Register = () => {
  console.log("[Register]: rendering");
  return (
    <Fragment>
      <h1 class="text-large text-success">
        Sign Up
    </h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="register-form">
        <div className="inputs">
          <div className="left">
            <div className="form-group">
              <label htmlFor="file-upload" className="file-upload-label">
                <span>Profile Image</span>
              </label>
              <input id="file-upload" type="file" />
            </div>
          </div>

          <div className="right">
            <div className="form-group">
              <input type="text" placeholder="Name" required />
            </div>

            <div className="form-group">
              <input type="email" placeholder="Email Address" />
            </div>

            <div className="form-group">
              <input type="password" placeholder="Password" minLength="6" />
              <small>
                * Password must be atleast 6 characters long
        </small>
            </div>

            <div className="form-group">
              <input type="password" placeholder="Confirm Password" minLength="6" />
            </div>
          </div>
        </div>


        <input type="submit" value="Register" className="btn btn-primary block-on-mobile" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
}

export default Register;