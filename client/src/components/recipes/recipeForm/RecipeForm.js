import React, { Fragment, useState, useCallback } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

import { addRecipe, clearAddedRecipe } from '../../../redux/actions/recipe';
import FileInput from '../../layout/FileInput';
import './RecipeForm.css';

const RecipeForm = (props) => {
  console.log('[RecipeForm]: rendering');

  const [formData, setFormData] = useState({
    description: '',
    title: '',
    ingredients: '',
    directions: '',
    prepTime: '',
    cookTime: '',
    numberOfServings: 0,
  });

  const [image, setImage] = useState('');

  const { description, title, ingredients, directions, prepTime, cookTime, numberOfServings } = formData;

  const onChangeHandler = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  const onImageChangeHandler = useCallback(e => {
    console.log('Image: ', e.target.files[0]);
    setImage(e.target.files[0]);
  }, [image]);

  const onSubmitHandler = e => {
    e.preventDefault();
    props.addRecipe({ ...formData, image });
    //props.history.push('/recipes');
  }

  console.log('NEW_RECIPE_ADDED: ', props.newRecipeAdded);
  if (props.newRecipeAdded) {
    props.clearAddedRecipe();
    props.history.push('/recipes');
  }

  return <Fragment>
    <h1 className="text-large text-success text-center">Share Your Recipe</h1>
    <form className="create-recipe-form" onSubmit={onSubmitHandler}>
      <div className="inputs">
        <div className="inputs-left">
          <div className="form-group">
            <FileInput
              image={image}
              imageHandler={onImageChangeHandler}
            />
          </div>

          <div className="form-group form-group-flex">
            <div>
              <label>Prep time (min)</label>
              <input type="number" name="prepTime" onChange={onChangeHandler} value={prepTime} />
            </div>

            <div>
              <label>Cook time (min)</label>
              <input type="number" name="cookTime" onChange={onChangeHandler} value={cookTime} />
            </div>
          </div>

          <div className="form-group form-group-flex">
            <div>
              <label>Number of Servings</label>
              <input type="number" name="numberOfServings" onChange={onChangeHandler} value={numberOfServings} />
            </div>
          </div>

          <button className="btn btn-success">Save</button>

          <a className="btn text-center" href="#">Cancel</a>
        </div>

        <div className="inputs-right">
          <div className="form-group">
            <label>Recipe title</label>
            <input type="text" name="title" onChange={onChangeHandler} value={title} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea rows="3" name="description" onChange={onChangeHandler} value={description}></textarea>
          </div>

          <div className="form-group">
            <label>Ingredients</label>
            <textarea rows="4" placeholder="Put each ingredient on it's own line" name="ingredients" onChange={onChangeHandler}
              value={ingredients}></textarea>
          </div>

          <div className="form-group">
            <label>Directions</label>
            <textarea rows="4" placeholder="Put each step on its own line" name="directions" onChange={onChangeHandler} value={directions}></textarea>
          </div>
        </div>
      </div>
    </form>
  </Fragment>
}

const mapStateToProps = state => ({
  newRecipeAdded: state.recipe.newRecipeAdded
});

export default connect(mapStateToProps, { addRecipe, clearAddedRecipe })(RecipeForm);