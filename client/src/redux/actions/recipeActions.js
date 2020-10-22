import axios from 'axios';
import { setAlert } from './alertActions';
import {
  RECIPE_ADD_COMMENT_SUCCESS,
  RECIPE_ADD_COMMENT_FAIL,
  RECIPE_LOAD_SINGLE_SUCCESS,
  RECIPE_LOAD_SINGLE_FAIL,
  RECIPE_CREATE_RECIPE_SUCCESS,
  RECIPE_CREATE_RECIPE_FAIL,
  RECIPE_LOAD_PAGE_REQUEST,
  RECIPE_LOAD_PAGE_SUCCESS,
  RECIPE_LOAD_PAGE_FAIL,
  RECIPE_UPDATE_RATING_SUCCESS,
  RECIPE_UPDATE_RATING_FAIL,
} from './types';

// Load Next Page
export const loadPage = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: RECIPE_LOAD_PAGE_REQUEST });

      const {
        recipeLoadPage: { date, page },
      } = getState();

      const nextPage = page + 1;
      const currentDate = date !== null ? date : new Date().getTime() + 1000;

      const res = await axios.get(
        `/api/recipes/loadPage?page=${nextPage}&date=${currentDate}`
      );

      dispatch({
        type: RECIPE_LOAD_PAGE_SUCCESS,
        payload: {
          recipes: res.data,
          page: nextPage,
          date: currentDate,
        },
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: RECIPE_LOAD_PAGE_FAIL,
        payload: { msg: err.response.statusText },
      });
    }
  };
};

// Add new Recipe
export const addRecipe = (inputData) => {
  return async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': userInfo.token,
      },
    };

    const { image, ...otherFormData } = inputData;
    const formData = new FormData();

    formData.append('file', image);
    for (let key in otherFormData) {
      formData.append(key.toString(), otherFormData[key]);
    }

    try {
      await axios.post('/api/recipes', formData, config);

      dispatch({
        type: RECIPE_CREATE_RECIPE_SUCCESS,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: RECIPE_CREATE_RECIPE_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
};

// Add like
export const addLike = (recipeId) => {
  return async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userInfo.token,
        },
      };

      let res = await axios.put(`/api/recipes/like/${recipeId}`, {}, config);

      const payload = {
        recipeId,
        likes: res.data,
        dislikes: [],
      };

      res = await axios.get(`/api/recipes/${recipeId}`);
      payload.dislikes = res.data.dislikes;

      dispatch({
        type: RECIPE_UPDATE_RATING_SUCCESS,
        payload,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: RECIPE_UPDATE_RATING_FAIL,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// Add dislike
export const addDislike = (recipeId) => {
  return async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userInfo.token,
        },
      };

      let res = await axios.put(`/api/recipes/dislike/${recipeId}`, {}, config);

      const payload = {
        recipeId,
        likes: [],
        dislikes: res.data,
      };

      res = await axios.get(`/api/recipes/${recipeId}`);
      payload.likes = res.data.likes;

      dispatch({
        type: RECIPE_UPDATE_RATING_SUCCESS,
        payload,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: RECIPE_UPDATE_RATING_FAIL,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// Get recipe
export const getRecipe = (recipeId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/recipes/${recipeId}`);

      dispatch({
        type: RECIPE_LOAD_SINGLE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: RECIPE_LOAD_SINGLE_FAIL,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};

// Add comment
export const addComment = (recipeId, formData) => {
  return async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': userInfo.token,
      },
    };

    try {
      const res = await axios.post(
        `/api/recipes/comment/${recipeId}`,
        formData,
        config
      );

      dispatch({
        type: RECIPE_ADD_COMMENT_SUCCESS,
        payload: res.data,
      });

      dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: RECIPE_ADD_COMMENT_FAIL,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};
