module.exports = {
  root: true,
  env: { browser: true, es6: true, node: true },
  parser: '@typescript-eslint/parser',
  parserOptions: { sourceType: 'module', extraFileExtensions: ['.json'] },
  ignorePatterns: ['.eslintrc.js', '**/*.js', 'node_modules/**', 'dist/**'],
  overrides: [
    {
      files: ['package.json'],
      plugins: ['eslint-plugin-n8n-nodes-base'],
      extends: ['plugin:n8n-nodes-base/community'],
      rules: { 'n8n-nodes-base/community-package-json-name-still-default': 'off' },
    },
    {
      files: ['./credentials/**/*.ts'],
      plugins: ['eslint-plugin-n8n-nodes-base'],
      extends: ['plugin:n8n-nodes-base/credentials'],
      // This rule (v1.16.7) mis-fires on valid full https documentationUrls,
      // "fixing" them into camelCase garbage. Real verified nodes use full URLs.
      rules: { 'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off' },
    },
    {
      files: ['./nodes/**/*.ts'],
      plugins: ['eslint-plugin-n8n-nodes-base'],
      extends: ['plugin:n8n-nodes-base/nodes'],
    },
  ],
};
