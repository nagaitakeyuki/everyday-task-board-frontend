const context = `${__dirname}/app`
const distPath = `${__dirname}/dist`
const exclude = /node_modules/

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

  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './index.html'
    })
  ]
}
