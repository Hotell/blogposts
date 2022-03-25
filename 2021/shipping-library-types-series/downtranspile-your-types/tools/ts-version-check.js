const { execSync } = require('child_process')
const semver = require('semver')
const supportedTsVersions = [
  '3.5',
  '3.6',
  '3.7',
  '3.8',
  '3.9',
  '4.0',
  '4.1',
  '4.2',
  '4.3',
  '4.4',
  '4.5',
  '4.6',
]

function main() {
  supportedTsVersions.forEach((version) => {
    try {
      execSync(`npx typescript@${version} -p tsconfig.dts.json`)
    } catch (err) {
      console.error(`TS ${version} issue`, err)
    }
  })
}

main()
