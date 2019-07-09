export let styleConfig = {
  defaultStyle: {},
  themes: {
    BLANK: {},
  },
  initialTheme: 'BLANK',
};

export default (config = {}) => {
  styleConfig = {...styleConfig, ...config};
};
