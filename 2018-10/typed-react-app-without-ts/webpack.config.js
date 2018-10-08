// @ts-check

const { resolve } = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: 'development',
  entry: resolve(__dirname, 'src/main.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: resolve(__dirname, 'src'),
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: resolve(__dirname, 'src/index.html'),
    }),
  ],
  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
  },
}

module.exports = config
