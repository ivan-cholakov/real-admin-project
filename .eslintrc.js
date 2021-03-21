module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    indent: ["error"],
    "no-useless-concat": 1,
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    "react/prop-types": 0,
    "react/display-name": 0,
    "no-console": 0,
  },
};
