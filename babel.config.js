
module.exports = {
  // root: __dirname,
  // rootMode: 'upward',
  // test: [__dirname],
  // include: ["./node_modules/leanes/src"],
  babelrcRoots: [ "." ],
  presets: [
    ['@babel/preset-env'],
  ],
  plugins: [
    "@babel/plugin-syntax-flow",
    "flow-runtime",
    /*["flow-runtime", {
      "assert": true,
      "annotate": true
    }],*/
    "@babel/plugin-transform-flow-strip-types",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    "@babel/plugin-transform-runtime"
  ]
}
