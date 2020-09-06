import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  console.log('[Navbar]: rendering');
  return <nav className="navbar">
    {/* Logo */}
    <Link to="/">
      <i className="logo fas fa-seedling"></i><span>Recipes</span> <span className="app">App</span>
    </Link>

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
  </nav>
}

export default Navbar;