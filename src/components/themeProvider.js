// Why is this class needed:
//  React Native Elements uses React context, which is great - but there are two issues:
//  1) they don't export the ThemeContext from ThemeProvider. This was the cleanest way I could find to
//     pass that context down so I can pass theme with the props to withStyles
//  2) if you change the value of the theme property on the ThemeProvider it doesnt actually update the
//     internal state that holds the theme. You have to call update theme

import React from 'react';

import {withTheme, ThemeProvider, ThemeConsumer} from 'react-native-elements';

import {compose, withEffect} from '@truefit/bach';
import {withSelector} from '@truefit/bach-redux';

import {themeSelector} from '../selectors';

export const ThemeContext = React.createContext({theme: null});

const InternalThemeConsumer = withTheme(
  compose(
    withSelector('appTheme', themeSelector),
    withEffect(
      ({appTheme, updateTheme}) => {
        updateTheme(appTheme);
      },
      ['appTheme'],
    ),
  )(({children}) => {
    return (
      <ThemeConsumer>
        {context => {
          return (
            <ThemeContext.Provider value={{theme: context.theme}}>
              {children}
            </ThemeContext.Provider>
          );
        }}
      </ThemeConsumer>
    );
  }),
);

export default props => (
  <ThemeProvider>
    <InternalThemeConsumer {...props} />
  </ThemeProvider>
);
