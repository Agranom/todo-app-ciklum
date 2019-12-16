const path = require('path');
const { ContextReplacementPlugin } = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  target: 'node',
  cache: true,
  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      'src',
      'node_modules',
    ],
  },
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    sourceMapFilename: '[name].map',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          /\.(spec)\.js$/,
          /node_modules/,
        ],
      },
    ],
    noParse: [
      /\.(spec)\.js$/,
      /LICENSE/,
      /README.md/,
    ],
  },
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    process: true,
    console: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    __dirname: false,
    __filename: false,
  },
  plugins: [
    new ContextReplacementPlugin(/.*/),
    new ProgressBarPlugin()
  ]
};
