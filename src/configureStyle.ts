/* eslint-disable import/no-mutable-exports */
import {StyleConfig} from './types';

export const styleConfig: StyleConfig = {
  sharedStyle: {},
};

export default (config: StyleConfig): void => {
  styleConfig.sharedStyle = config.sharedStyle;
};
