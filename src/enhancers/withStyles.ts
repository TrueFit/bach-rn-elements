import {useMemo, useContext} from 'react';
import {
  PROPS,
  generateConditionCode,
  isFunction,
  EnhancerContext,
  EnhancerResult,
  DependencyList,
} from '@truefit/bach';

import {ThemeContext} from 'react-native-elements';

import {styleConfig} from '../configureStyle';
import {NamedStyles} from '../types';

const STYLES = 'styles';
const THEME = 'theme';

export default <T>(
  componentStyles: NamedStyles | ((t: T | undefined) => NamedStyles) = {},
  conditions?: DependencyList<T>,
) => ({generateNewVariable}: EnhancerContext): EnhancerResult => {
  const isFuncStyles = isFunction(componentStyles);
  const conditionCode = isFuncStyles ? generateConditionCode(conditions) : '';

  const joinAlias = generateNewVariable();
  const componentStyleAlias = generateNewVariable();
  const themeContextAlias = generateNewVariable();

  const componentStyleFunc = isFuncStyles
    ? componentStyles
    : (): NamedStyles => componentStyles as NamedStyles;

  // we need to lazy eval this
  const join = (styles: NamedStyles): NamedStyles => ({
    ...styleConfig.sharedStyle,
    ...styles,
  });

  return {
    dependencies: {
      useMemo,
      useContext,
      ThemeContext,

      [joinAlias]: join,
      [componentStyleAlias]: componentStyleFunc,
    },
    initialize: `
      const ${themeContextAlias} = useContext(ThemeContext);
      const ${THEME} = ${themeContextAlias}.theme;

      // needed to give access to the theme for the execution of the style func
      ${PROPS}.${THEME} = ${THEME};

      const ${STYLES} = useMemo(function() {
        return ${joinAlias}(${componentStyleAlias}(${PROPS}));
      }, [${conditionCode}]);
    `,
    props: [STYLES, THEME],
  };
};
