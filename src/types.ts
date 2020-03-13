import {StyleProp, ViewStyle, TextStyle, ImageStyle} from 'react-native';
import {Theme} from 'react-native-elements';
import {StringKeyMap} from '@truefit/bach';

export type StyleConfig = {
  sharedStyle: NamedStyles;
};

export type AllStyleProp = StyleProp<ViewStyle | TextStyle | ImageStyle>;
export type NamedStyles = StringKeyMap<AllStyleProp>;

export type WithTheme = {theme: Theme};
