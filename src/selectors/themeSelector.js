import {createSelector} from 'reselect';
import activeThemeNameSelector from './activeThemeNameSelector.js';
import {styleConfig} from '../util/configureStyle';

export default createSelector(
  activeThemeNameSelector,
  activeThemeName => styleConfig.themes[activeThemeName],
);
