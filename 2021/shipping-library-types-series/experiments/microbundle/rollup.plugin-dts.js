import dts from 'rollup-plugin-dts'

const config = [
  // …
  {
    input: './dist/types/index.d.ts',
    output: [{ file: 'dist/plugin-dts.rollup.d.ts', format: 'es' }],
    plugins: [dts()],
  },
]

export default config
