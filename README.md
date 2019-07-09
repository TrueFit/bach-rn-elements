# @truefit/bach-rn-elements

This library allows components composed with [@truefit/bach](https://github.com/truefit/bach) to build their react native apps using [react-native-elements](https://react-native-training.github.io/react-native-elements/).

## Installation

```
npm install @truefit/bach-rn-elements
```

or

```
yarn add @truefit/bach-rn-elements
```

## Setup

The setup for this library is a little more involved than other enhancer packages due to the integration with the UI. There are a couple of critical pieces you need to have in place, but if the steps below are followed, both app level theming and individual component styling can be accomplished with ease and clarity.

### configureStyle

**This configuration method needs to be called prior to the creation of the themeReducer**

This function allows you to provide your configuration of themes and styles. This function is invoked with the configuration object detailed below:

| Parameter    | Type              | Description                                                       |
| ------------ | ----------------- | ----------------------------------------------------------------- |
| defaultStyle | js object         | the styles that should be available to every component            |
| themes       | js object         | the themes map that you are providing for the app                 |
| initialTheme | string (optional) | the key in themes object for the initial theme the app should use |

For further information on theming with react-native-elements, please see their [documentation](https://react-native-training.github.io/react-native-elements/docs/customization.html)

_Example_

```
import {configureStyle} from '@truefit/bach-rn-elements';

// themes
export const LIGHT = 'LIGHT';
export const DARK = 'DARK';

const light = {
  colors: {
    primary: '#E15554',
    secondary: '#E1BC29',
  },
};

const dark = {
  colors: {
    primary: '#1E2028',
    secondary: '#DF2935',
  },
};

const THEMES = {
  [LIGHT]: light,
  [DARK]: dark,
};

// styles
const defaultTheme = {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

// configure
configureStyle({
  defaultStyle: defaultTheme,
  themes: THEMES,
  initialTheme: DARK,
});
```

### ThemeProvider

This component wraps the [ThemeProvider](https://react-native-training.github.io/react-native-elements/docs/customization.html#using-themeprovider) provided by react-native-elements.

This component should wrap your root app component (typically directly inside of the redux provider).

```
import React from 'react';
import {Provider} from 'react-redux';
import {ConnectedNavigator} from '@truefit/rn-navigation';
import {ThemeProvider} from '@truefit/bach-rn-elements';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider>
          <ConnectedNavigator />
        </ThemeProvider>
      </Provider>
    );
  }
}
```

### Redux Tie-In

This library uses redux to store the name of the active theme. It follows the standard action creator -> action -> reducer paradigm. In addition, we also provide [reselect](https://github.com/reduxjs/reselect) selectors to provide easy access to the store values.

#### setActiveTheme

This is the action creator. It has the following signature:

| Parameter | Type   | Description                                       |
| --------- | ------ | ------------------------------------------------- |
| theme     | string | the key in the themes map configured on app start |

#### themeReducer

This reducer keeps track of the active theme name.

**This reducer needs to be added to your root reducer configuration at the key: theme**

```
import {combineReducers} from 'redux';
import {themeReducer} from '@truefit/bach-rn-elements';

export default combineReducers({
  theme: themeReducer,
  // ... other reducers
});
```

#### themeNameSelector

This selector returns the name of the current active theme.

#### themeSelector

This selector returns the theme object defined in the map at the key of the current active theme.

## Enhancers

### withStyles

Allows you to specify component specific styles as well as access the global style.

_Helper Signature_

| Parameter       | Type                 | Description                                                                                                                                            |
| --------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| componentStyles | js object or js func | component specific styles or a function that returns the component specific styles. if a function is specified, it is provided with the current props. |
| conditions      | array (optional)     | like other enhances such as withState, this controls how often the componentStyles value is re-evaluted                                                |
| stylesName      | string (optional)    | the property name at which the styles object is provided to the component, defaults to styles                                                          |
| themeName       | string (optional)    | the property name at which the theme object is provided to the component, defaults to theme                                                            |

_Example_

```
import React from 'react';
import {compose} from '@truefit/bach';
import {withStyles} from '@truefit/bach-rn-elements';
import {Text} from 'react-native-elements';

import Layout from './layout';

const Landing = ({styles}) => {
  return (
    <Layout style={styles.centerContent} full>
      <Text h1 style={styles.title}>
        Welcome to the React Native Playground
      </Text>
    </Layout>
  );
};

export default compose(
  withStyles(({theme}) => {
    return {
      title: {
        textAlign: 'center',
        color: theme.colors.primary,
      },
    };
  }),
)(Landing);
```

### withBadge

Allows you to apply a badge to almost any react native component

_Helper Signature_

| Parameter | Type                            | Description                                                                                                                                                                                      |
| --------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| value     | js object or js func            | the value displayed in the badge or a function the produces the value to be displayed. If a function, it is invoked with the current props.                                                      |
| options   | js object or js func (optional) | the options to configure the badge per the [react-native-elements documentation](https://react-native-training.github.io/react-native-elements/docs/badge.html#withbadge-higher-order-component) |

_Example_

```
import React from 'react';
import {compose} from '@truefit/bach';
import {withBadge} from '@truefit/bach-rn-elements';

import {Avatar} from 'react-native-elements';

const BadgedAvatar = compose(
  withBadge({
    value: ({user}) => user.messages,
    options: ({user}) => ({status: user.status}),
  }),
)(Avatar);
```
