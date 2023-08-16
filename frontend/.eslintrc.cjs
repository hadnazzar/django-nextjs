/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-misused-promises": "off",

    "@typescript-eslint/no-unsafe-member-access": [
      "off",
      { argsIgnorePattern: "src/ui/components" },
    ],
    "@typescript-eslint/no-unsafe-argument": [
      "off",
      { argsIgnorePattern: "src/ui/components" },
    ],
    "@typescript-eslint/no-unsafe-call": [
      "off",
      { argsIgnorePattern: "src/ui/components" },
    ],
    "@typescript-eslint/no-unsafe-return": [
      "off",
      { argsIgnorePattern: "src/ui/components" },
    ],
    "@typescript-eslint/consistent-type-definitions": [
      "off",
      { argsIgnorePattern: "src/ui/components" },
    ],
    "@typescript-eslint/no-unsafe-assignment": [
      "off",
      { argsIgnorePattern: "src/ui/components" },
    ],
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
  },
};

module.exports = config;
