import {useMemo, useContext} from 'react';
import {PROPS, generateConditionCode, isFunction} from '@truefit/bach';

import {ThemeContext} from 'react-native-elements';

import {styleConfig} from '../util/configureStyle';
import {STYLES, THEME} from '../constants';

export default (
  componentStyles = {},
  conditions,
  stylesName = STYLES,
  themeName = THEME,
) => ({generateNewVariable}) => {
  const isFuncStyles = isFunction(componentStyles);
  const conditionCode = isFuncStyles ? generateConditionCode(conditions) : '';

  const logicAlias = generateNewVariable();
  const valueAlias = generateNewVariable();

  const logic = props => {
    const resolvedStyles = isFuncStyles
      ? componentStyles(props, styleConfig.defaultStyle)
      : componentStyles;

    return {
      ...styleConfig.defaultStyle,
      ...resolvedStyles,
    };
  };

  return {
    dependencies: {
      useMemo,
      useContext,
      ThemeContext,

      [logicAlias]: logic,
    },
    initialize: `
      const ${valueAlias} = useContext(ThemeContext);
      ${PROPS}.${themeName} = ${valueAlias}.theme;

      const ${stylesName} = useMemo(function() { return ${logicAlias}(${PROPS}); }, [${conditionCode}]);
    `,
    props: [stylesName],
  };
};
