const funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const Rollup = require("broccoli-rollup");
const babel = require("rollup-plugin-babel");
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const globals = require('rollup-plugin-node-globals');
const { terser } = require('rollup-plugin-terser');

const appRoot = __dirname + '/src';

const extensions = [".ts", ".js"];

let js = new Rollup(appRoot, {
  inputFiles: ["**/*.js"],
  annotation: "LeanES",
  rollup: {
    input: __dirname + "/src/index.js",
    external: [
      'crypto',
      'net',
      'dns',
      'stream',
      'buffer',
      'events',
      'querystring',
      'url'
    ],
    plugins: [
      json({
        extensions,
        include: 'node_modules/**',
        preferConst: true,
        indent: '  ',
        compact: true,
        namedExports: true
      }),
      nodeResolve({
        extensions,
        browser: true,
        preferBuiltins: false,
      }),
      commonjs({
        include: 'node_modules/**',
        preferBuiltins: false
      }),
      babel({
        extensions,
        sourceMap: true,
        babelrcRoots: [
          "./src/**",
        ],
        exclude: "node_modules/**",
        presets: [
          "@babel/preset-env"
        ],
        plugins: [
          "@babel/plugin-syntax-flow",
          "flow-runtime",
          "@babel/plugin-transform-flow-strip-types",
          ["@babel/plugin-proposal-decorators", { "legacy": true }],
          ["@babel/plugin-proposal-class-properties", { "loose": true }],
          // 'transform-class-properties',
        ],
      }),
      globals({
        // include: [__dirname + "/src/**"],
        // exclude: [__dirname + 'node_modules/**'],
        sourceMap: false,
        process: false,
        buffer: false,
        dirname: true,
        filename: true,
        global: false,
        baseDir: process.cwd() + "/src/"
      }),
    ],
    output: [
      {
        dir: __dirname + '/lib',
        entryFileNames: 'index.dev.js',
        format: "cjs",
        name: "LeanES",
        sourcemap: true,
      },
      {
        dir: __dirname + '/lib',
        entryFileNames: 'index.min.js',
        format: "cjs",
        name: "LeanES",
        sourcemap: true,
        plugins: [
          terser()
        ]
      }
    ],
  }
});


// Remove the existing module.exports and replace with:
let tree = mergeTrees([js], { annotation: "Final output" });

module.exports = tree;
