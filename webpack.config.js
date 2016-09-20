var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './react.jsx',
  output: { path: __dirname, filename: '/public/javascripts/bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components|public)/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
