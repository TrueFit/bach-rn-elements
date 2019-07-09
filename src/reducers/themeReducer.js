import {SET_ACTIVE_THEME} from '../actions';
import {styleConfig} from '../util/configureStyle';

export default (state = styleConfig.initialTheme, action) => {
  if (action.type === SET_ACTIVE_THEME) {
    return action.payload;
  }

  return state;
};
