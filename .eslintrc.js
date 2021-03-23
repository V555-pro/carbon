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
  parser: "vue-eslint-parser",
  parserOptions: {    
    parser: "babel-eslint",
    ecmaVersion: 2020,
    sourceType: "module"
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
