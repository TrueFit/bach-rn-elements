import {ReactNode} from 'react';
import {StyleProp, ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {BadgeProps, Theme} from 'react-native-elements';
import {StringKeyMap} from '@truefit/bach';

export type StyleConfig = {
  sharedStyle: NamedStyles;
};

export type WithBadgeConfigOptions = {
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
  hidden?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
} & BadgeProps;

export type WithBadgeConfig<T> = {
  value?: ReactNode | ((t: T | undefined) => ReactNode);
  options?: WithBadgeConfigOptions | ((t: T | undefined) => WithBadgeConfigOptions);
};

export type AllStyleProp = StyleProp<ViewStyle | TextStyle | ImageStyle>;
export type NamedStyles = StringKeyMap<AllStyleProp>;

export type WithTheme = {theme: Theme};
