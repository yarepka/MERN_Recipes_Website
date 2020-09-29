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

const initialState = {
  recipes: [],
  recipe: null,
  loading: true,
  newRecipeAdded: false,
  error: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [payload, ...state.recipes],
        loading: false,
        newRecipeAdded: true
      };
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload,
        loading: false,
      };
    case RECIPE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_ADDED_RECIPE:
      return {
        ...state,
        newRecipeAdded: false
      };

    default:
      return state;
  }
}