import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../redux/actions/userActions';

import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const authLinks = (
    <ul>
      <li>
        <Link to='/recipes' className='btn'>
          Recipes
        </Link>
      </li>
      <li>
        <Link to='/create-recipe' className='btn'>
          New
        </Link>
      </li>
      <li>
        <button className='btn' onClick={logoutHandler}>
          Logout
        </button>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/recipes' className='btn'>
          Recipes
        </Link>
      </li>
      <li>
        <Link to='/login' className='btn'>
          Log In
        </Link>
      </li>
      <li>
        <Link to='/register' className='btn'>
          Register
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar'>
      {/* Logo */}
      <Link to='/'>
        <i className='logo fas fa-seedling'></i>
        <span>Recipes</span> <span className='app'>App</span>
      </Link>

      <Fragment>{userInfo ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

export default Navbar;
