import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../redux/actions/auth';

import './Navbar.css';

const Navbar = ({ isAuthenticated, loading, logout }) => {
  console.log('[Navbar]: rendering');

  const authLinks = (
    <ul>
      <li>
        <Link to="/recipes" className="btn">Recipes</Link>
      </li>
      <li>
        <Link to="/create-recipe" className="btn">New</Link>
      </li>
      <li>
        <a className="btn" onClick={logout}>Logout</a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/recipes" className="btn">Recipes</Link>
      </li>
      <li>
        <Link to="/login" className="btn">Log In</Link>
      </li>
      <li>
        <Link to="/register" className="btn">Register</Link>
      </li>
    </ul>
  );

  return <nav className="navbar">
    {/* Logo */}
    <Link to="/">
      <i className="logo fas fa-seedling"></i><span>Recipes</span> <span className="app">App</span>
    </Link>

    {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}

  </nav>
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { logout })(Navbar);