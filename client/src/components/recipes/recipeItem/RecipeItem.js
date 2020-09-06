import React from 'react';

import './RecipeItem.css';

const RecipeItem = ({
  image,
  recipe: {
    id,
    title,
    description,
    user,
    likes,
    dislikes
  }
}) => {
  console.log('[RecipeItem]: rendering');
  return (
    <div className="recipe">
      <div className="recipe-img" style={{ backgroundImage: "url(" + image + ")" }}></div>
      <div className="recipe-info">
        <div className="head">
          <h2>Lorem ipsum dolor sit amet.</h2>
          <p href="#" className="author small">Author: John Doe</p>

          <div className="my-1">
            <p className="recipe-portions">
              <i className="fas fa-smile"></i><span className="servings"><span className="number">4</span> Portions</span>
            </p>
            <p className="recipe-time">
              <i className="far fa-clock"></i><span className="time"><span className="number">30</span> minutes</span>
            </p>
          </div>

          <div>
            <p className="recipe-description my-1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente doloribus blanditiis incidunt est
              saepe laborum rem velit optio. Nulla facere esse harum quasi blanditiis iste assumenda incidunt?
              Placeat, dolores dolor?
        </p>
          </div>
        </div>

        <div className="buttons">
          <div className="likes-and-dislikes">
            <button className="btn btn-success">
              <i className="fas fa-thumbs-up"></i> <span>4</span>
            </button>
            <button className="btn btn-danger">
              <i className="fas fa-thumbs-down"></i> <span>5</span>
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