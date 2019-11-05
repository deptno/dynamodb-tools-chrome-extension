import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: './src/background.ts',
  output: {
    file: './dist/background.js',
    format: 'cjs',
  },
  plugins: [
    commonjs(),
    typescript(),
  ],
  external: [
    'aws-sdk',
    'ramda',
    'crypto',
    'zlib'
  ]
}
