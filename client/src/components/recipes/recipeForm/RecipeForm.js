import React, { Fragment } from 'react';

import './RecipeForm.css';

const RecipeForm = () => {
  console.log('[RecipeForm]: rendering');

  

  return <Fragment>
    <h1 class="text-large text-success text-center">Share Your Recipe</h1>
    <form class="create-recipe-form">
      <div class="inputs">
        <div class="inputs-left">
          <div class="form-group">
            <label htmlFor="file-upload" class="file-upload-label">
              <span>Recipe Image</span>
            </label>

            <input id="file-upload" type="file" />
          </div>

          <div class="form-group form-group-flex">
            <div>
              <label>Prep time</label>
              <input type="text" />
            </div>

            <div>
              <label>Cook time</label>
              <input type="text" />
            </div>
          </div>

          <div class="form-group form-group-flex">
            <div>
              <label>
                Ready in <span class="optional">(Optional)</span>
              </label>

              <input type="text" />
            </div>

            <div>
              <label>Number of Sevings</label>
              <input type="text" />
            </div>
          </div>

          <button class="btn btn-success">Save</button>

          <a class="btn text-center" href="#">Cancel</a>
        </div>

        <div class="inputs-right">
          <div class="form-group">
            <label>Recipe title</label>
            <input type="text" />
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea rows="3"></textarea>
          </div>

          <div class="form-group">
            <label>Ingredients</label>
            <textarea rows="4" placeholder="Put each ingredient on it's own line"></textarea>
          </div>

          <div class="form-group">
            <label>Directions</label>
            <textarea rows="4" placeholder="Put each step on its own line"></textarea>
          </div>
        </div>
      </div>
    </form>
  </Fragment>
}

export default RecipeForm;