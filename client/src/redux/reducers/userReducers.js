import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../actions/types';

export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: payload };
    case USER_LOGIN_FAIL:
      return { loading: false, errors: payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true };
    case USER_REGISTER_FAIL:
      return { loading: false, errors: payload };
    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

// const initialState = {
//   token: localStorage.getItem('token'),
//   isAuthenticated: null,
//   loading: true,
//   user: null,
// };

// export default (state = initialState, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case USER_LOADED:
//       return {
//         ...state,
//         isAuthenticated: true,
//         loading: false,
//         user: payload,
//       };
//     case REGISTER_SUCCESS:
//     case LOGIN_SUCCESS:
//       localStorage.setItem('token', payload.token);
//       return {
//         ...state,
//         ...payload,
//         isAuthenticated: true,
//         loading: false,
//       };
//     case REGISTER_FAIL:
//     case LOGIN_FAIL:
//     case AUTH_ERROR:
//     case LOGOUT:
//       localStorage.removeItem('token');
//       return {
//         ...state,
//         token: null,
//         isAuthenticated: false,
//         loading: false,
//         user: null,
//       };
//     default:
//       return state;
//   }
// };
