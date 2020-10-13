import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addLike, addDislike } from '../../../redux/actions/recipeActions';
import './RecipeItem.css';

const RecipeItem = ({ recipe, history, disabled }) => {
  const dispatch = useDispatch();

  const onVisitHandler = (id) => {
    history.push(`/recipes/${id}`);
  };

  const onLikeHandler = (recipeId) => {
    dispatch(addLike(recipeId));
  };

  const onDislikeHandler = (recipeId) => {
    dispatch(addDislike(recipeId));
  };

  return (
    <div className='recipe'>
      <div
        className='recipe-img'
        style={{ backgroundImage: 'url(./uploads/' + recipe.imagePath + ')' }}
        onClick={(e) => onVisitHandler(recipe.id)}
      ></div>
      <div className='recipe-info'>
        <div className='head'>
          <h2 onClick={(e) => onVisitHandler(recipe.id)}>{recipe.title}</h2>
          <p className='author small'>Author: {recipe.name}</p>

          <div className='my-1'>
            <p className='recipe-portions'>
              <i className='fas fa-smile'></i>
              <span className='servings'>
                <span className='number'>{recipe.numberOfServings}</span>{' '}
                Portions
              </span>
            </p>
            <p className='recipe-time'>
              <i className='far fa-clock'></i>
              <span className='time'>
                <span className='number'>{recipe.readyIn}</span> minutes
              </span>
            </p>
          </div>

          <div>
            <p className='recipe-description my-1'>{recipe.description}</p>
          </div>
        </div>

        <div className='buttons'>
          <div className='likes-and-dislikes'>
            <button
              className='btn btn-success'
              onClick={() => onLikeHandler(recipe.id)}
              disabled={disabled}
            >
              <i className='fas fa-thumbs-up'></i>{' '}
              <span>{recipe.likes.length}</span>
            </button>

            <button
              className='btn btn-danger'
              onClick={() => onDislikeHandler(recipe.id)}
              disabled={disabled}
            >
              <i className='fas fa-thumbs-down'></i>{' '}
              <span>{recipe.dislikes.length}</span>
            </button>
          </div>

          <Link to={`/recipes/${recipe.id}`} className='btn view'>
            <i className='fa fa-search'></i> View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RecipeItem);
