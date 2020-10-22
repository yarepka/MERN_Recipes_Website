import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  RECIPE_LOAD_SINGLE_RESET,
  ALERT_RESET,
} from '../../redux/actions/types';
import {
  addLike,
  addDislike,
  getRecipe,
} from '../../redux/actions/recipeActions';
import Spinner from '../layout/Spinner';
import CommentForm from './CommentForm';
import Comments from './Comments';
import './Recipe.css';

const Recipe = ({ match }) => {
  const recipeId = match.params.id;
  const dispatch = useDispatch();
  const recipeSingle = useSelector((state) => state.recipeSingle);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { recipe, loading } = recipeSingle;

  const onLikeHandler = (recipeId) => {
    dispatch(addLike(recipeId));
  };

  const onDislikeHandler = (recipeId) => {
    dispatch(addDislike(recipeId));
  };

  useEffect(() => {
    dispatch(getRecipe(recipeId));
  }, []);

  useEffect(() => {
    return () => {
      dispatch({ type: RECIPE_LOAD_SINGLE_RESET });
      dispatch({ type: ALERT_RESET });
    };
  }, []);

  return loading ? (
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
              onClick={() => onLikeHandler(recipe.id)}
              disabled={!userInfo}
            >
              <i className='fas fa-thumbs-up'></i>
              <span className='single-comment-likes'>
                {recipe.likes.length}
              </span>
            </button>

            <button
              className='btn btn-transparent'
              onClick={() => onDislikeHandler(recipe.id)}
              disabled={!userInfo}
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
      {userInfo && <CommentForm recipeId={recipe.id} userInfo={userInfo} />}
    </Fragment>
  );
};

export default Recipe;
