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

### configureStyle

### ThemeProvider

### Theme Reducer

## Enhancers

### withStyles

Allows you to specify component specific styles as well as access the global style

_Helper Signature_

| Parameter       | Type                 | Description |
| --------------- | -------------------- | ----------- |
| componentStyles | js object or js func |             |
| conditions      | array (optional)     |             |
| stylesName      | string (optional)    |             |
| themeName       | string (optional)    |             |

_Example_

```
import React from 'react';
import {compose} from '@truefit/bach';

```

### withBadge

Allows you to apply a badge to almost any react native component

_Helper Signature_

| Parameter | Type                            | Description |
| --------- | ------------------------------- | ----------- |
| value     | js object or js func            |             |
| options   | js object or js func (optional) |             |

_Example_

```
import React from 'react';
import {compose} from '@truefit/bach';

```
