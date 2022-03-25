// @ts-check
const path = require('path')
const fs = require('fs')
const semver = require('semver')
const { execSync } = require('child_process')

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

  fs.copyFileSync(
    path.join(__dirname, '..', `dist/index.rollup.d.ts`),
    path.join(__dirname, '..', `test/index.d.ts`)
  )
  console.log(`Checking types for TS ${tsVersions.current}`)
  execSync('dtslint --expectOnly test', { stdio: 'inherit' })

  supportedMinVersions.forEach((version) => {
    const normalizedVersion = version.replace(/\.\d$/, '')
    const src = path.join(
      __dirname,
      '..',
      `dist/ts${normalizedVersion}/index.rollup.d.ts`
    )
    const dest = path.join(__dirname, '..', `test/index.d.ts`)

    console.log(`Checking types for TS ${normalizedVersion}`)
    fs.copyFileSync(src, dest)
    execSync('dtslint --expectOnly test', { stdio: 'inherit' })
  })
}
