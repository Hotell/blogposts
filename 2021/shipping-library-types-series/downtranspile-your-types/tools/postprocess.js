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
  return file.replace(
    /.*\s*type\s+\w+\s*=\s*(`[${}|\w\s]+`)/gim,
    (match, p1, offset, string) => {
      if (p1.includes('${')) {
        return match.replace(p1, 'string')
      }

      return string.replace(/`/g, `'`)
    }
  )
}
