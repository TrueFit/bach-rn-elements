import {createSelector} from 'reselect';
import themeNameSelector from './themeNameSelector';
import {styleConfig} from '../util/configureStyle';

export default createSelector(
  themeNameSelector,
  themeName => styleConfig.themes[themeName],
);
