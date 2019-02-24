const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const sourceMaps = require('rollup-plugin-sourcemaps');
const typescript = require('rollup-plugin-typescript2');
const json = require('rollup-plugin-json');
const {terser} = require('rollup-plugin-terser');
const pkg = require('./package.json');

const inputOption = {
    input: 'src/index.tsx',
    external: ['react', 'prop-types'],
    plugins: [
        json(),
        typescript({
            useTsconfigDeclarationDir: true
        }),
        commonjs(),
        resolve(),
        sourceMaps(),
        terser()
    ]
};

const outputOption = [
    {file: pkg.main, name: 'index', format: 'cjs', sourcemap: true},
    {file: pkg.module, name: 'index', format: 'es', sourcemap: true}
];

// why divide into two option
// https://github.com/TrySound/rollup-plugin-terser/issues/5
export default outputOption.map(output => ({...inputOption, output}));
