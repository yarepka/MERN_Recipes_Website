import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_RECIPES,
  RECIPE_ERROR,
  UPDATE_RATING,
  DELETE_RECIPE,
  ADD_RECIPE,
  GET_RECIPE,
  ADD_COMMENT,
  REMOVE_COMMENT,
  CLEAR_ADDED_RECIPE
} from '../actions/types';
import setAuthToken from '../../utils/setAuthToken';

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
      dispatch({
        type: RECIPE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });

      err.response.data.errors.forEach(error => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
  };
}

// Add like
export const addLike = recipeId => {
  return async dispatch => {
    try {
      let res = await axios.put(`/api/recipes/like/${recipeId}`);
      const payload = {
        recipeId,
        likes: res.data,
        dislikes: []
      };

      res = await axios.get(`/api/recipes/${recipeId}`);
      payload.dislikes = res.data.dislikes;

      dispatch({
        type: UPDATE_RATING,
        payload
      });
    } catch (err) {
      dispatch({
        type: RECIPE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      })
    }
  }
};

// Add dislike
export const addDislike = recipeId => {
  return async dispatch => {
    try {
      let res = await axios.put(`/api/recipes/dislike/${recipeId}`);
      const payload = {
        recipeId,
        likes: [],
        dislikes: res.data
      };

      res = await axios.get(`/api/recipes/${recipeId}`);
      payload.likes = res.data.likes;

      dispatch({
        type: UPDATE_RATING,
        payload
      });
    } catch (err) {
      dispatch({
        type: RECIPE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      })
    }
  }
};

// Get recipe
export const getRecipe = recipeId => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/recipes/${recipeId}`);

      dispatch({
        type: GET_RECIPE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: RECIPE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      });
    }
  };
}

// Add comment
export const addComment = (recipeId, formData) => {
  return async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`/api/recipes/comment/${recipeId}`, formData, config);

      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      });

      dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
      dispatch({
        type: RECIPE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      });
    }

  };
}

// Clear added recipe
export const clearAddedRecipe = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_ADDED_RECIPE
    });
    setAuthToken();
  };
};