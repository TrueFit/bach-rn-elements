import {ReactNode} from 'react';
import {REACT, COMPONENT, PROPS, isFunction, EnhancerContext, EnhancerResult} from '@truefit/bach';
import {withBadge} from 'react-native-elements';
import {WithBadgeConfig, WithBadgeConfigOptions} from '../types';

export default <T>({value, options}: WithBadgeConfig<T>) => ({
  generateNewVariable,
}: EnhancerContext): EnhancerResult => {
  const valueFunc = isFunction(value) ? value : (): ReactNode => (value || {}) as ReactNode;
  const optionsFunc = isFunction(options)
    ? options
    : (): WithBadgeConfigOptions => (options || {}) as WithBadgeConfigOptions;

  const valueAlias = generateNewVariable();
  const optionsAlias = generateNewVariable();

  return {
    dependencies: {
      withBadge,
      [valueAlias]: valueFunc,
      [optionsAlias]: optionsFunc,
    },
    initialize: `
      const hoc = ${REACT}.createElement(${COMPONENT}, ${PROPS});

      return withBadge(${valueAlias}(${PROPS}), ${optionsAlias}(${PROPS}));
    `,
    props: Array<string>(),
  };
};
