import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_RECIPES,
  RECIPE_ERROR,
  UPDATE_LIKES,
  UPDATE_DISLIKES,
  DELETE_RECIPE,
  ADD_RECIPE,
  GET_RECIPE,
  ADD_COMMENT,
  REMOVE_COMMENT,
  CLEAR_ADDED_RECIPE
} from '../actions/types';

// Get Recipes
export const getRecipes = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/recipes');
      dispatch({
        type: GET_RECIPES,
        payload: res.data
      });
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: RECIPE_ERROR,
        payload: { msg: err.response.statusText }
      });
    }
  }
};

// Add new Recipe
export const addRecipe = (inputData) => {
  return async dispatch => {
    console.log(inputData)
    const { image, ...otherFormData } = inputData;
    const formData = new FormData();
    const config = {
      header: {
        'Content-Type': 'multipart/form-data'
      }
    };

    formData.append('file', image);
    for (let key in otherFormData) {
      formData.append(key.toString(), otherFormData[key]);
    }

    try {
      const res = await axios.post('/api/recipes', formData, config);

      dispatch({
        type: ADD_RECIPE,
        payload: res.data
      });

      dispatch(setAlert('Recipe Created', 'succes'));
    } catch (err) {
      console.log(err);
      dispatch({
        type: RECIPE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });

      console.log(err.response.data.errors);
      err.response.data.errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
  };
}

// Clear added recipe
export const clearAddedRecipe = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_ADDED_RECIPE
    })
  };
};