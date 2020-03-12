/* eslint-disable import/no-mutable-exports */
import {StyleConfig} from './types';

export let styleConfig: StyleConfig = {
  sharedStyle: {},
};

export default (config: StyleConfig): void => {
  styleConfig = {...styleConfig, ...config};
};
