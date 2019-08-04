module.exports = {
  css: {
    extract: false,
  },
  configureWebpack: {
    externals: {
      easymde: {
        commonjs: 'easymde',
        commonjs2: 'easymde',
        amd: 'easymde',
        root: 'EasyMDE',
      },
      marked: 'marked',
    },
  },
};
