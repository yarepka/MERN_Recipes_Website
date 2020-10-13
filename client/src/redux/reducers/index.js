import { combineReducers } from 'redux';

import { alertManagerReducer } from './alertReducers';

import { userLoginReducer, userRegisterReducer } from './userReducers';

import {
  recipeLoadPageReducer,
  recipeCreateReducer,
  recipeSingleReducer,
} from './recipeReducers';

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  recipeLoadPage: recipeLoadPageReducer,
  recipeCreate: recipeCreateReducer,
  recipeSingle: recipeSingleReducer,
  alertManager: alertManagerReducer,
});
