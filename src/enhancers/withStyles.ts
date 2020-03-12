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

  const sharedStyleAlias = generateNewVariable();
  const componentStyleAlias = generateNewVariable();
  const themeContextAlias = generateNewVariable();

  const componentStyleFunc = isFuncStyles
    ? componentStyles
    : (): NamedStyles => componentStyles as NamedStyles;

  return {
    dependencies: {
      useMemo,
      useContext,
      ThemeContext,

      [sharedStyleAlias]: styleConfig.sharedStyle,
      [componentStyleAlias]: componentStyleFunc,
    },
    initialize: `
      const ${themeContextAlias} = useContext(ThemeContext);
      ${PROPS}.${THEME} = ${themeContextAlias}.theme;

      const ${STYLES} = useMemo(function() { 
        const componentStyle = ${componentStyleAlias}(${PROPS});
        
        return Object.assign(${sharedStyleAlias}, componentStyle);
      }, [${conditionCode}]);
    `,
    props: [STYLES, THEME],
  };
};
