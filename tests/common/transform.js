const babel = require("@babel/core");
const RestyledComponentsPlugin = require("../../index").default;

const transform = (input, options) => {
  return babel.transformSync(input, {
    filename: "index.js",
    presets: [],
    plugins: [RestyledComponentsPlugin(options)],
  }).code;
};

module.exports = {
  transform,
};
