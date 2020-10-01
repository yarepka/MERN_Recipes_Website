import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT, REMOVE_ALL_ALERTS } from './types';

export const setAlert = (msg, alertType, timeout = 5000) => {
  return (dispatch) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: {
        id: id,
        msg: msg,
        alertType: alertType,
      },
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      });
    }, timeout);
  };
};

export const removeAllAlerts = () => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_ALL_ALERTS,
    });
  };
};
