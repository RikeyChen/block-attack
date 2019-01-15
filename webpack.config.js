const path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: './public/stylesheets',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*'],
  },
};
