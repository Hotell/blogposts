const path = require('path')
const fs = require('fs')

main()

function main() {
  const sourcePath = path.join(
    __dirname,
    '..',
    'dist',
    'ts3.4',
    'index.rollup.d.ts'
  )
  const destinationPath = sourcePath
  const source = fs.readFileSync(sourcePath, 'utf-8')
  const result = replaceStringTypeLiterals(source)
  fs.writeFileSync(destinationPath, result)
}

function replaceStringTypeLiterals(file) {
  const regexp = /`[${}|\w\s]+`/gim
  const type = 'string'

  return file.replace(regexp, type)
}
