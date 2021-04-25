module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    "react/prop-types": "off"
  },
  settings: {
    react: {
      version: "detect",
    }
  },
  overrides: [
    {
      files: [
        "**/*.test.js",
        "**/*.test.jsx"
      ]
    }
  ]
}
