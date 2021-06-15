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
import {NamedStyles, LazyStyleFunc} from '../types';

const STYLES = 'styles';
const THEME = 'theme';

const generateLazyStyleFunc = <T>(style: NamedStyles | LazyStyleFunc<T>): LazyStyleFunc<T> => {
  if (isFunction(style)) {
    return style as unknown as LazyStyleFunc<T>;
  }

  return () => style as NamedStyles;
};

export default <T>(
    componentStyles: NamedStyles | LazyStyleFunc<T> = {},
    conditions?: DependencyList<T>,
  ) =>
  ({generateNewVariable}: EnhancerContext): EnhancerResult => {
    const conditionCode = generateConditionCode(conditions);

    const joinStyleAlias = generateNewVariable();
    const themeContextAlias = generateNewVariable();

    // this lazy evals the styles so we can use prop values
    const joinStyles = (props: T): NamedStyles => {
      // we need to lazy eval the sharedStyle from config because of the typical launch sequence
      const sharedStyles = generateLazyStyleFunc<T>(styleConfig.sharedStyle)(props);
      const styles = generateLazyStyleFunc<T>(componentStyles)(props);

      return {
        ...sharedStyles,
        ...styles,
      };
    };

    return {
      dependencies: {
        useMemo,
        useContext,
        ThemeContext,

        [joinStyleAlias]: joinStyles,
      },
      initialize: `
      // needed to give access to the theme for the execution of the style func
      const ${themeContextAlias} = useContext(ThemeContext);
      const ${THEME} = ${themeContextAlias}.theme;
      
      ${PROPS}.${THEME} = ${THEME};

      // generate the styles
      const ${STYLES} = useMemo(function() {
        return ${joinStyleAlias}(${PROPS});
      }, [${conditionCode}]);
    `,
      props: [STYLES, THEME],
    };
  };
