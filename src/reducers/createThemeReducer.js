import {SET_ACTIVE_THEME} from '../actions';

export default initialTheme => (state = initialTheme, action) => {
  if (action.type === SET_ACTIVE_THEME) {
    return action.payload;
  }

  return state;
};
