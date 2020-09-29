import React from 'react';

import './RecipeItem.css';

const RecipeItem = ({ recipe }) => {
  console.log('[RecipeItem]: rendering');
  console.log('Recipe: ', recipe);
  return (
    <div className="recipe">
      <div className="recipe-img" style={{ backgroundImage: "url(./uploads/" + recipe.imagePath + ")" }}></div>
      <div className="recipe-info">
        <div className="head">
          <h2>{recipe.title}</h2>
          <p className="author small">Author: {recipe.name}</p>

          <div className="my-1">
            <p className="recipe-portions">
              <i className="fas fa-smile"></i><span className="servings"><span className="number">{recipe.numberOfServings}</span> Portions</span>
            </p>
            <p className="recipe-time">
              <i className="far fa-clock"></i><span className="time"><span className="number">{recipe.readyIn}</span> minutes</span>
            </p>
          </div>

          <div>
            <p className="recipe-description my-1">
              {recipe.description}
            </p>
          </div>
        </div>

        <div className="buttons">
          <div className="likes-and-dislikes">
            <button className="btn btn-success">
              <i className="fas fa-thumbs-up"></i> <span>{recipe.likes.length}</span>
            </button>
            <button className="btn btn-danger">
              <i className="fas fa-thumbs-down"></i> <span>{recipe.dislikes.length}</span>
            </button>
          </div>
          <button className="btn add-to-favorite">
            <i className="fas fa-star"></i> Add to favorite
      </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeItem;