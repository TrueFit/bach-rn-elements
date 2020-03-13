# @truefit/bach-rn-elements

This library allows components composed with [@truefit/bach](https://github.com/truefit/bach) to build their react native apps using [react-native-elements](https://react-native-training.github.io/react-native-elements/).

## Installation

```
npm install @truefit/bach-rn-elements react-native-elements react-native-vector-icons
```

or

```
yarn add @truefit/bach-rn-elements react-native-elements react-native-vector-icons
```

## Setup

### configureStyle

This function allows you to provide your configuration shared styles. It is not required, but can prove helpful when using a design system.

| Parameter   | Type      | Description                                            |
| ----------- | --------- | ------------------------------------------------------ |
| sharedStyle | js object | the styles that should be available to every component |

_Example_

#### Typescript

```Typescript
import {configureStyle, NamedStyles} from '@truefit/bach-rn-elements';

// styles
const sharedStyle: NamedStyles = {
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

#### Javascript

// configure
configureStyle({sharedStyle});
```

```Javascript
import {configureStyle} from '@truefit/bach-rn-elements';

// styles
const sharedStyle = {
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
configureStyle({sharedStyle});
```

## Enhancers

### withStyles

Allows you to specify component specific styles as well as access the shared style defined in configureStyle.

_Helper Signature_

| Parameter       | Type                 | Description                                                                                                                                            |
| --------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| componentStyles | js object or js func | component specific styles or a function that returns the component specific styles. if a function is specified, it is provided with the current props. |
| conditions      | array (optional)     | like other enhances such as withState, this controls how often the componentStyles value is re-evaluted                                                |

_Example_

#### Typescript

```Typescript
import React from 'react';
import {compose} from '@truefit/bach';
import {compose, withState, withCallback, StringKeyMap} from '@truefit/bach';
import {withStyles, WithTheme} from '@truefit/bach-rn-elements';

import {View, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {Text} from 'react-native-elements';

type Props = {
  styles: {
    container: StyleProp<ViewStyle>;
    title: StyleProp<TextStyle>;
  };
} & WithTheme;

const Landing = ({styles}: Props) => {
  return (
    <View style={styles.centerContent}>
      <Text h1 style={styles.title}>
        Welcome to the React Native Playground
      </Text>
    </View>
  );
};

const styles = ({theme}: Props): NamedStyles => ({
  title: {
    textAlign: 'center',
    color: theme.colors.primary,
  },
});

export default compose(
  withStyles(styles),
)(Landing);
```

#### Javascript

```Javascript
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
