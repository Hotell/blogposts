const path = require('path')
const tsc = require('tsc-prog')

rollup()

function rollup() {
  tsc.build({
    // ...
    basePath: path.join(__dirname, '..'),
    configFilePath: 'tsconfig.json',
    compilerOptions: {
      /**
       * this overrides tsconfig.json#declarationDir in manner that rolluped declaration file will be printed here
       */
      declarationDir: 'dist',
      /**
       * won't work with declaration bundling
       */
      declarationMap: false,
    },
    bundleDeclaration: {
      /**
       * this is resolved from tsconfig.json#declarationDir
       */
      entryPoint: 'index.d.ts',
      fallbackOnError: false, // default: true
      globals: false, // default: true
      augmentations: false, // default: true
    },
  })
}
