/* eslint-disable import/unambiguous, import/no-commonjs */
const {rollup} = require('rollup');
const autoExternal = require('rollup-plugin-auto-external');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const {eslint} = require('rollup-plugin-eslint');
const {terser} = require('rollup-plugin-terser');

const inputOptions = {
    input: 'src/index.js',
    external(id) {
        return id in packageInfo.peerDependencies
    },
    plugins: [
        resolve({main: true, module: true}),
        commonjs({include: 'node_modules/**'}),
        autoExternal(),
        eslint(),
        babel({exclude: 'node_modules/**'}),
        terser()
    ]
};

const build = async () => {
    const bundle = await rollup(inputOptions);

    bundle.write({format: 'cjs', file: 'cjs/index.js', sourcemap: true});
    bundle.write({format: 'es', file: 'es/index.js', sourcemap: true});
};

build();
