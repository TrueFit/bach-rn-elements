import {AllStyleProp} from '../types';

export default (...styles: Array<AllStyleProp>): AllStyleProp =>
  styles.reduce((acc: AllStyleProp, value: AllStyleProp) => Object.assign(acc, value), {});
