/* eslint-disable @typescript-eslint/no-explicit-any */
import {StyleProp, ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {Theme} from 'react-native-elements';
import {StringKeyMap} from '@truefit/bach';

export type WithTheme = {theme: Theme};

export type StyleConfig = {
  sharedStyle: NamedStyles | ((props: any | undefined) => NamedStyles);
};

export type AllStyleProp = StyleProp<ViewStyle | TextStyle | ImageStyle>;
export type NamedStyles = StringKeyMap<AllStyleProp>;
export type LazyStyleFunc<T> = (t: T | undefined) => NamedStyles;
