// @ts-check
const path = require('path')
const fs = require('fs')
const semver = require('semver')

main()

function main() {
  const pkgJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')
  )
  /**
   * @type {{[range:string]:{[glob:string]:string[]}}}
   */
  const typesVersions = pkgJson.typesVersions

  const supportedMinVersions = Object.keys(typesVersions).map(
    (versionRange) => {
      return semver.minVersion(versionRange).version
    }
  )
  const tsVersions = {
    lowest: '3.4',
    current: pkgJson.devDependencies.typescript,
  }

  supportedMinVersions.forEach((version) => {
    downlevel(version)
  })

  addPragmaForCurrent(tsVersions.current)
}

/**
 *
 * @param {string} version
 */
function addPragmaForCurrent(version) {
  const sourcePath = path.join(__dirname, '..', 'dist', 'index.rollup.d.ts')
  const destinationPath = sourcePath
  const source = fs.readFileSync(sourcePath, 'utf-8')
  const result = `${addMinTsVersionSupportedPragma(version)}\n${source}`

  fs.writeFileSync(destinationPath, result)
}

/**
 *
 * @param {string} version
 */
function downlevel(version) {
  const sourcePath = path.join(
    __dirname,
    '..',
    'dist',
    `ts${version.replace('.0', '')}`,
    'index.rollup.d.ts'
  )
  const destinationPath = sourcePath
  const source = fs.readFileSync(sourcePath, 'utf-8')
  let result = replaceStringTypeLiterals(source, version)
  result = replaceAwaitedTypeHelper(result, version)
  result = replaceAsConditionalCast(result, version)

  result = `${addMinTsVersionSupportedPragma(version)}\n${result}`

  fs.writeFileSync(destinationPath, result)
}

/**
 *
 * @param {string} version
 */
function addMinTsVersionSupportedPragma(version) {
  return `// Minimum TypeScript Version: ${version.replace(/\.\d$/, '')}`
}

/**
 *
 * @param {string} file
 * @param {string} version
 * @returns
 */
function replaceStringTypeLiterals(file, version) {
  const regexp = /`[${}|\w\s]+`/gim
  const type = 'string'

  return file.replace(regexp, type)
}

/**
 *
 * @param {string} file
 * @param {string} version
 * @returns
 */
function replaceAwaitedTypeHelper(file, version) {
  const regexp = /Awaited</im

  const type =
    semver.gte(version, '4.1.0') && semver.lt(version, '4.5.0')
      ? `
   type Awaited<T> = T extends null | undefined
  ? T // special case for 'null | undefined' when not in '--strictNullChecks' mode
  : T extends object & { then(onfulfilled: infer F): any } // 'await' only unwraps object types with a callable 'then'. Non-object types are not unwrapped
  ? F extends (value: infer V, ...args: any) => any // if the argument to 'then' is callable, extracts the first argument
    ? Awaited<V> // recursively unwrap the value
    : never // the argument to 'then' was not callable
  : T // non-object or non-thenable
  `
      : `type Awaited<T> = any`

  if (regexp.test(file)) {
    return `${type}\n${file}`
  }

  return file
}

function replaceAsConditionalCast(file, version) {
  const regexp = /\[[\w\s]+(as\s+.*)\]\s*:/gim

  if (semver.gte(version, '4.1.0')) {
    return file
  }

  return file.replace(regexp, (match, p1) => {
    return match.replace(p1, '')
  })
}
