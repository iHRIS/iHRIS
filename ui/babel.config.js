module.exports = {
  presets: [
    "@babel/preset-env",
    { exclude: "transform-typeof-symbol" },
    "@vue/app"
  ]
};
