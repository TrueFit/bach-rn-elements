export let styleConfig = {
  defaultStyle: {},
  themes: {},
  initialTheme: '',
};

export default (config = {}) => {
  styleConfig = {...styleConfig, ...config};
};
