const path = require('path');

const context = `${__dirname}/app`
const distPath = `${__dirname}/dist`
const exclude = /node_modules/

const environment = process.env.ENV || 'dev';

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context,

  entry: ['babel-polyfill', './index.js'],

  output: {
    path: distPath,
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude,
        options: {
          presets: ['env', 'react', 'stage-0'],
          plugins: ['transform-async-to-generator']
        }
      }
    ]
  },

  resolve: {
    alias: {
      userEnv$: path.resolve(__dirname, `env/${environment}.js`),
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './index.html'
    })
  ]
}
