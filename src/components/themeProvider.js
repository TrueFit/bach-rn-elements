// Why this is needed:
//  1) if you change the value of the theme property on the ThemeProvider it doesnt actually update the
//     internal state that holds the theme. You have to call updateTheme imperatively
//     this component abstracts that so you can just use redux

import React from 'react';
import {ThemeProvider} from 'react-native-elements';

import {compose, withEffect} from '@truefit/bach';
import {withSelector} from '@truefit/bach-redux';

import {themeSelector} from '../selectors';

const InternalProvider = compose(
  withSelector('appTheme', themeSelector),

  withEffect(
    ({appTheme, updateTheme}) => {
      updateTheme(appTheme);
    },
    ['appTheme'],
  ),
)(({children}) => children);

const Provider = ({appTheme, children}) => (
  <ThemeProvider theme={appTheme}>
    <InternalProvider>{children}</InternalProvider>
  </ThemeProvider>
);

export default compose(withSelector('appTheme', themeSelector))(Provider);
