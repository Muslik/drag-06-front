const { configure, presets } = require('eslint-kit');

module.exports = configure({
  allowDebug: process.env.NODE_ENV !== 'production',

  presets: [presets.node(), presets.typescript(), presets.react(), presets.effector()],
  extend: {
    rules: {
      'newline-before-return': 'error',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
    },
  },
});
