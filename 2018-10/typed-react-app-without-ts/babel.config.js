// @ts-check

/**
 * @typedef  {Array<string | [string,{[key:string]:any}]>} BabelConfigObj
 */

/**
 * @typedef {{presets: BabelConfigObj, plugins: BabelConfigObj}} BabelConfig
 */

/**
 * @type {BabelConfig}
 */
const config = {
  presets: [
    '@babel/typescript',
    '@babel/react',
    [
      '@babel/preset-env',
      {
        targets: { browsers: 'last 2 versions' },
        useBuiltIns: 'usage',
        modules: false,
        loose: true,
      },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['@babel/proposal-class-properties', { loose: true }],
    ['@babel/proposal-object-rest-spread', { loose: true }],
  ],
}

module.exports = config
