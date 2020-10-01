import { SET_ALERT, REMOVE_ALERT, REMOVE_ALL_ALERTS } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.length > 0
        ? state.filter((alert) => alert.id !== payload)
        : state;
    case REMOVE_ALL_ALERTS:
      return [];
    default:
      return state;
  }
};
