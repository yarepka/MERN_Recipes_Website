import {
  RECIPE_ADD_COMMENT_SUCCESS,
  RECIPE_ADD_COMMENT_FAIL,
  RECIPE_LOAD_SINGLE_SUCCESS,
  RECIPE_LOAD_SINGLE_FAIL,
  RECIPE_LOAD_SINGLE_RESET,
  RECIPE_CREATE_RECIPE_SUCCESS,
  RECIPE_CREATE_RECIPE_FAIL,
  RECIPE_CREATE_RECIPE_RESET,
  RECIPE_LOAD_PAGE_REQUEST,
  RECIPE_LOAD_PAGE_SUCCESS,
  RECIPE_LOAD_PAGE_FAIL,
  RECIPE_LOAD_PAGE_RESET,
  RECIPE_UPDATE_RATING_SUCCESS,
  RECIPE_UPDATE_RATING_FAIL,
} from '../actions/types';

export const recipeLoadPageReducer = (
  state = {
    hasMore: true,
    loading: true,
    loadingPage: false,
    recipes: [],
    page: 0,
    date: null,
  },
  action
) => {
  const { payload, type } = action;
  switch (type) {
    case RECIPE_LOAD_PAGE_REQUEST:
      return {
        ...state,
        loadingPage: true,
      };
    case RECIPE_LOAD_PAGE_SUCCESS:
      return {
        ...state,
        recipes: state.recipes.concat(payload.recipes),
        hasMore: payload.recipes.length > 0 ? true : false,
        loading: false,
        date: payload.date,
        page: payload.page,
        loadingPage: false,
      };
    case RECIPE_LOAD_PAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        loadingPage: false,
      };
    case RECIPE_UPDATE_RATING_SUCCESS:
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe.id === payload.recipeId
            ? {
                ...recipe,
                likes: payload.likes,
                dislikes: payload.dislikes,
              }
            : recipe
        ),
      };
    case RECIPE_UPDATE_RATING_FAIL:
      return {
        ...state,
        error: state.recipes.length > 0 ? payload : null,
      };
    case RECIPE_LOAD_PAGE_RESET:
      return {
        hasMore: true,
        loading: true,
        loadingPage: false,
        recipes: [],
        page: 0,
        date: null,
      };
    default:
      return state;
  }
};

export const recipeCreateReducer = (state = {}, action) => {
  const { payload, type } = action;
  switch (type) {
    case RECIPE_CREATE_RECIPE_SUCCESS:
      return {
        success: true,
      };
    case RECIPE_CREATE_RECIPE_FAIL:
      return {
        error: payload,
      };
    case RECIPE_CREATE_RECIPE_RESET:
      return {};
    default:
      return state;
  }
};

export const recipeSingleReducer = (state = { loading: true }, action) => {
  const { payload, type } = action;
  switch (type) {
    case RECIPE_LOAD_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        recipe: payload,
      };
    case RECIPE_LOAD_SINGLE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case RECIPE_LOAD_SINGLE_RESET:
      return {
        loading: true,
      };
    case RECIPE_UPDATE_RATING_SUCCESS:
      return {
        ...state,
        recipe:
          state.recipe &&
          state.recipe !== null &&
          state.recipe.id === payload.recipeId
            ? {
                ...state.recipe,
                likes: payload.likes,
                dislikes: payload.dislikes,
              }
            : state.recipe,
      };
    case RECIPE_ADD_COMMENT_SUCCESS:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          comments: payload,
        },
      };
    case RECIPE_ADD_COMMENT_FAIL:
      return {
        ...state,
        error: payload,
      };
    case RECIPE_UPDATE_RATING_FAIL:
      return {
        ...state,
        error: state.recipe ? payload : null,
      };
    default:
      return state;
  }
};
