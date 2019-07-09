export let styleConfig = {
  defaultStyle: {},
  themes: {},
  activeTheme: '',
};

export default (config = {}) => {
  styleConfig = {...styleConfig, ...config};
};
