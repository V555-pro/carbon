module.exports = {
  env: {
    node: true,
    commonjs: true
  },
  root: true,
  extends: [
    "plugin:vue/essential",
    "plugin:prettier/recommended",
    "eslint:recommended"
  ],
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    allowImportExportEverywhere: true
  },
  rules: {
    "prettier/prettier": [
      "warn",
      {
        singleQuote: true,
        semi: false,
        trailingComma: "none"
      }
    ],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
