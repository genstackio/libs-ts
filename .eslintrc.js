module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  settings: {
  },
  extends: [
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.

  ],
  root: true,
  plugins: [
    'jest',
    'no-for-of-loops',
    'no-function-declare-after-return',
  ],
  rules: {
    "@typescript-eslint/ban-types": ["error", {"types": {"Function": false}}],
    "@typescript-eslint/consistent-indexed-object-style": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
