import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import globals from 'rollup-plugin-node-globals'
import builtins from 'rollup-plugin-node-builtins'

export default {
  input: './src/inject.ts',
  output: {
    file: './dist/inject.js',
    format: 'iife',
  },
  plugins: [
    commonjs({
    }),
    globals(),
    builtins(),
    resolve({
      browser: true,
    }),
    typescript(),
  ]
}
