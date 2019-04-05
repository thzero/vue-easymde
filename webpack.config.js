const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const env = process.env.NODE_ENV;

module.exports = {
  entry: './index.js',
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: env === 'production' ? 'vue-easymde.min.js' : 'vue-easymde.js',
    library: 'VueEasyMDE',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: {
    simplemde: {
      commonjs: 'easymde',
      commonjs2: 'easymde',
      amd: 'easymde',
      root: 'EasyMDE',
    },
    marked: 'marked',
  },
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      easymde: 'easymde',
    },
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
  },
  performance: {
    hints: false,
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};

if (env === 'production') {
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    /*new webpack.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
      },
    }),*/
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
}
