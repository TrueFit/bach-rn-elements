import {REACT, COMPONENT, PROPS, isFunction} from '@truefit/bach';
import {withBadge} from 'react-native-elements';

export default ({value, options}) => ({generateNewVariable}) => {
  const resultAlias = generateNewVariable();
  const logicAlias = generateNewVariable();
  const hocAlias = generateNewVariable();

  const logic = props => {
    const resolvedValue = isFunction(value) ? value(props) : value;
    const resolvedOptions = isFunction(options) ? options(props) : options;

    return {
      value: resolvedValue,
      options: resolvedOptions,
    };
  };

  return {
    dependencies: {
      withBadge,
      [logicAlias]: logic,
    },
    initialize: `const ${resultAlias} = ${logicAlias}(${PROPS});`,
    render: `
      const ${hocAlias} = withBadge(${resultAlias}.value, ${resultAlias}.options)(${COMPONENT});
      return ${REACT}.createElement(${hocAlias}, ${PROPS});
    `,
    props: [],
  };
};
