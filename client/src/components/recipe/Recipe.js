import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import CommentForm from './CommentForm';
import Comments from './Comments';
import { getRecipe, addLike, addDislike } from '../../redux/actions/recipe';
import { removeAllAlerts } from '../../redux/actions/alert';
import './Recipe.css';

const Recipe = ({
  removeAllAlerts,
  getRecipe,
  addLike,
  addDislike,
  alerts,
  recipe: { recipe, loading },
  match,
}) => {
  console.log('[Recipe.js]: rendering');

  useEffect(() => {
    if (alerts.length > 0) removeAllAlerts();
    getRecipe(match.params.id);
  }, []);

  return loading || recipe === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='single-recipe'>
        <h1 className='text-center my-2'>{recipe.title}</h1>

        <div className='single-recipe-content'>
          <div className='time-info'>
            <p className='hide-on-pad'>
              <i className='fas fa-stopwatch'></i>
              <span>
                <strong>Prep: </strong> {recipe.prepTime} min
              </span>
            </p>

            <p className='hide-on-pad'>
              <i className='far fa-clock'></i>
              <span>
                <strong>Cook: </strong> {recipe.cookTime} min
              </span>
            </p>

            <p className='hide-on-mobile'>
              <i className='fas fa-smile'></i>
              <span>
                <strong>Servings: </strong> {recipe.numberOfServings}
              </span>
            </p>

            <p className='show-on-pad'>
              <i className='far fa-clock'></i>
              <span>
                <strong>Cook: </strong> {recipe.cookTime} min
              </span>
            </p>
          </div>

          <div className='single-recipe-rating'>
            <button
              className='btn btn-transparent'
              onClick={(e) => addLike(recipe.id)}
            >
              <i className='fas fa-thumbs-up'></i>
              <span className='single-comment-likes'>
                {recipe.likes.length}
              </span>
            </button>

            <button
              className='btn btn-transparent'
              onClick={(e) => addDislike(recipe.id)}
            >
              <i className='fas fa-thumbs-down'></i>
              <span className='single-comment-likes'>
                {recipe.dislikes.length}
              </span>
            </button>
          </div>

          <div className='line-small'></div>

          <img src={`/uploads/${recipe.imagePath}`} alt='recipe-image' />

          <div className='chonk single-recipe-author'>
            <span className='author-top'>author</span>
            <p className='single-recipe-author-text' href='#'>
              {' '}
              {recipe.name}{' '}
            </p>
          </div>

          <div className='single-recipe-description'>
            <p>{recipe.description}.</p>
          </div>

          <ul className='chonk ingredients-list'>
            <span>Ingredients</span>
            {recipe.ingredients.map((ing, index) => {
              return (
                <li key={index}>
                  <p>{ing}</p>
                </li>
              );
            })}
          </ul>

          <ul className='chonk directions-list'>
            <span>Directions</span>
            {recipe.directions.map((dir, index) => {
              return (
                <li key={index}>
                  <strong>{++index}. </strong>
                  <span>{dir}.</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {recipe.comments.length > 0 && <Comments comments={recipe.comments} />}
      <CommentForm recipeId={recipe.id} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  recipe: state.recipe,
  alerts: state.alert,
});

export default connect(mapStateToProps, {
  getRecipe,
  addLike,
  addDislike,
  removeAllAlerts,
})(Recipe);
