import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAlert } from '../../../redux/actions/alertActions';
import { addRecipe } from '../../../redux/actions/recipeActions';
import { RECIPE_CREATE_RECIPE_RESET } from '../../../redux/actions/types';
import FileInput from '../../layout/FileInput';
import './RecipeForm.css';

const RecipeForm = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo) history.push('/login?redirect=create-recipe');

  const recipeCreate = useSelector((state) => state.recipeCreate);
  const { success } = recipeCreate;

  if (success) history.push('/recipes');

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

  const {
    description,
    title,
    ingredients,
    directions,
    prepTime,
    cookTime,
    numberOfServings,
  } = formData;

  const onChangeHandler = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onCancelHandler = () => {
    history.goBack();
  };

  const onImageChangeHandler = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file.type.split('/')[0] === 'image') {
        setImage(file);
      } else {
        setImage('');
        dispatch(setAlert('You can only use image files', 'danger'));
      }
    },
    [image]
  );

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addRecipe({ ...formData, image }));
  };

  useEffect(() => {
    return () => {
      dispatch({ type: RECIPE_CREATE_RECIPE_RESET });
    };
  }, []);

  return (
    <Fragment>
      <h1 className='text-large text-success text-center'>Share Your Recipe</h1>
      <form className='create-recipe-form' onSubmit={onSubmitHandler}>
        <div className='inputs'>
          <div className='inputs-left'>
            <div className='form-group'>
              <FileInput image={image} imageHandler={onImageChangeHandler} />
            </div>

            <div className='form-group form-group-flex'>
              <div>
                <label>Prep time (min)</label>
                <input
                  type='number'
                  name='prepTime'
                  onChange={onChangeHandler}
                  value={prepTime}
                />
              </div>

              <div>
                <label>Cook time (min)</label>
                <input
                  type='number'
                  name='cookTime'
                  onChange={onChangeHandler}
                  value={cookTime}
                />
              </div>
            </div>

            <div className='form-group form-group-flex'>
              <div>
                <label>Number of Servings</label>
                <input
                  type='number'
                  name='numberOfServings'
                  onChange={onChangeHandler}
                  value={numberOfServings}
                />
              </div>
            </div>

            <button className='btn btn-success'>Save</button>

            <button
              type='button'
              className='btn text-center'
              onClick={(e) => onCancelHandler()}
            >
              Cancel
            </button>
          </div>

          <div className='inputs-right'>
            <div className='form-group'>
              <label>Recipe title</label>
              <input
                type='text'
                name='title'
                onChange={onChangeHandler}
                value={title}
              />
            </div>

            <div className='form-group'>
              <label>Description</label>
              <textarea
                rows='3'
                name='description'
                onChange={onChangeHandler}
                value={description}
              ></textarea>
            </div>

            <div className='form-group'>
              <label>Ingredients</label>
              <textarea
                rows='4'
                placeholder="Put each ingredient on it's own line"
                name='ingredients'
                onChange={onChangeHandler}
                value={ingredients}
              ></textarea>
            </div>

            <div className='form-group'>
              <label>Directions</label>
              <textarea
                rows='4'
                placeholder='Put each step on its own line'
                name='directions'
                onChange={onChangeHandler}
                value={directions}
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default RecipeForm;
