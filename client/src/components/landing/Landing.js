import React from 'react';
import { Link } from 'react-router-dom';

import './Landing.css';

const Landing = () => {
  console.log('[Landing]: rendering');
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="text-large landing-heading">Want to share your recipe?</h1>
          <Link to="/create-recipe" className="btn btn-success landing-button">
            Create Recipe
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Landing;