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
    case UPDATE_RATING:
      return {
        ...state,
        recipes: state.recipes
          .map(recipe => recipe.id === payload.recipeId ? {
            ...recipe,
            likes: payload.likes,
            dislikes: payload.dislikes
          } : recipe
          ),
        recipe: state.recipe !== null && state.recipe.id === payload.recipeId ? { ...state.recipe, likes: payload.likes, dislikes: payload.dislikes } : state.recipe
      };
    case GET_RECIPE:
      return {
        ...state,
        recipe: payload,
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          comments: payload
        },
        loading: false
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