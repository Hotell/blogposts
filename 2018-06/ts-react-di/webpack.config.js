// @ts-check
const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ROOT = resolve(__dirname)
const SRC_PATH = resolve(ROOT, 'src')
const PATHS = {
  entry: resolve(SRC_PATH, 'main.ts'),
  output: resolve(ROOT, 'dist'),
  tsConfig: resolve(ROOT, 'tsconfig.prod.json'),
  content: resolve(SRC_PATH, 'public'),
  html: resolve(SRC_PATH, 'index.html'),
}

/**
 * @type {import('webpack-dev-server').Configuration}
 */
const devServer = {
  overlay: true,
  contentBase: PATHS.content,
  historyApiFallback: true,
  hot: true,
  stats: 'errors-only',
}

/**
 * @type {Partial<import('ts-loader').Options>}
 */
const tsLoaderOptionsRules = {
  configFile: PATHS.tsConfig,
  transpileOnly: true,
}

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: {
    main: PATHS.entry,
  },
  output: {
    filename: '[name].[hash].js',
    path: PATHS.output,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      lib: resolve(SRC_PATH, 'lib'),
    },
  },
  devServer,
  devtool: 'inline-source-map',
  stats: 'minimal',
  module: {
    rules: [
      {
        include: SRC_PATH,
        test: /\.tsx?$/,
        loader: 'ts-loader',
        // options: tsLoaderOptionsRules,
      },
      {
        include: SRC_PATH,
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React + TS',
      template: PATHS.html,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new ForkTsCheckerWebpackPlugin({
    //   tsconfig: PATHS.tsConfig,
    //   formatter: 'codeframe',
    //   checkSyntacticErrors: true,
    //   watch: ['./src']
    // })
  ],
}

module.exports = config
