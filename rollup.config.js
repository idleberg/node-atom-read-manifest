import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  commonjs(),
  json(),
  typescript({
    allowSyntheticDefaultImports: true,
    strictNullChecks: true
  })
];

const external = [
  'atom',
  'electron'
];

export default [
  {
    external,
    input: 'src/index.ts',
    output: {
      dir: 'lib',
      format: 'cjs'
    },
    plugins: plugins
  }
];
