import {SET_ACTIVE_THEME} from '../actions';

export default (state = null, action) => {
  if (action.type === SET_ACTIVE_THEME) {
    return action.payload;
  }

  return state;
};
