module.exports = {
  rules: {
    "no-console": 0,
    "no-shadow": 0,
    "consistent-return": "off",
    "prefer-destructuring": 1,
    "no-undef": 1,
    "no-multi-assign": "off",
    "no-param-reassign": "off",
    "no-use-before-define": "off",
    // "no-unused var": "off",
    "max-len": "off"
  },
  env: {
    node: true,
    browser: true,
    es6: true
  },

  parser: "babel-eslint",
  extends: ["airbnb-base", "plugin:import/errors", "plugin:import/warnings"]
};