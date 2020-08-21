/* eslint-disable no-undef */
module.exports = {
  root: true,
  plugins: [
    'jsdoc',
    '@typescript-eslint',
    'eslint-comments',
    'jest',
    'lodash',
    'promise',
    'unicorn',
  ],
  extends: [
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:lodash/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'xo',
    'xo-typescript/space',
    'prettier',
    // 'prettier/babel',
    'prettier/@typescript-eslint',
  ],
  env: {
    browser: true,
    jest: true,
    es6: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      extraFileExtensions: ['json', 'js', 'txt', '<text>']
    }
  },

  // add your custom rules here
  rules: {
    // 'Style' Oriented Rules
    // TODO These might be better off deleted and handled only by prettier
    'semi': [
      'error',
      'never'
    ],
    'quotes': [
      'error',
      'single'
    ],

    // Standard Rules
    'new-cap': 'off',
    'no-param-reassign': 'off',
    'prefer-destructuring': [
      'error',
      {
        'object': true,
        'array': true
      }
    ],
    'array-callback-return': [
      'error',
      {
        'allowImplicit': true
      }
    ],
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    // Personal preference, I like private variables ending in underscores.
    'no-underscore-dangle': 'off',
    'spaced-comment': 'off',
    // End Standard  = = = = = = = = = = = = = = = = = = = = = = = = =

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // import Rules
    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    'import/prefer-default-export': 'off',
    // End import  = = = = = = = = = = = = = = = = = = = = = = = = = =

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // Typescript Rules
    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      }
    ],
    'no-unused-vars': 'off', // note you must disable the base rule as it can report incorrect errors
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        'vars': 'all',
        'args': 'none',
        'ignoreRestSiblings': false
      }
    ],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        'multiline': {
          'delimiter': 'none',
          'requireLast': false
        },
        'singleline': {
          'delimiter': 'semi',
          'requireLast': false
        }
      }
    ],
    // Use function hoisting to improve code readability
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    '@typescript-eslint/class-literal-property-style': ["error", "fields"],
    '@typescript-eslint/member-ordering': 'off',
    // End Typescript  = = = = = = = = = = = = = = = = = = = = = = = =

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // Unicorn Rules (Default Values)
    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    'unicorn/better-regex': 'error',
    'unicorn/catch-error-name': 'error',
    'unicorn/consistent-function-scoping': 'error',
    'unicorn/custom-error-definition': 'off',
    'unicorn/error-message': 'error',
    'unicorn/escape-case': 'error',
    'unicorn/expiring-todo-comments': 'error',
    'unicorn/explicit-length-check': 'error',
    // I like to name my classes as Class and others like utility.ts
    'unicorn/filename-case': 'off', // default value 'error'
    'unicorn/import-index': 'error', // #### Option is throwing error as of 08.19.20
    // 'unicorn/import-style': 'error', // #### Option is throwing error as of 08.19.20
    'unicorn/new-for-builtins': 'error',
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/no-array-instanceof': 'error',
    'unicorn/no-console-spaces': 'error',
    'unicorn/no-fn-reference-in-iterator': 'off', // default value 'error'
    'unicorn/no-for-loop': 'error',
    'unicorn/no-hex-escape': 'error',
    'unicorn/no-keyword-prefix': 'off',
    'no-nested-ternary': 'off',
    'unicorn/no-nested-ternary': 'off', // default value 'error'
    'unicorn/no-new-buffer': 'error',
    'unicorn/no-null': 'error',
    'unicorn/no-object-as-default-parameter': 'warn', // default value 'error'
    'unicorn/no-process-exit': 'error',
    'unicorn/no-reduce': 'off', // default value 'error'
    'unicorn/no-unreadable-array-destructuring': 'error',
    'unicorn/no-unsafe-regex': 'off',
    'unicorn/no-unused-properties': 'off',
    'unicorn/no-useless-undefined': 'error',
    'unicorn/no-zero-fractions': 'error',
    'unicorn/number-literal-case': 'error',
    'unicorn/prefer-add-event-listener': 'error',
    'unicorn/prefer-array-find': 'error',
    'unicorn/prefer-dataset': 'error',
    'unicorn/prefer-event-key': 'error',
    'unicorn/prefer-flat-map': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-modern-dom-apis': 'error',
    'unicorn/prefer-negative-index': 'error',
    'unicorn/prefer-node-append': 'error',
    'unicorn/prefer-node-remove': 'error',
    'unicorn/prefer-number-properties': 'error',
    'unicorn/prefer-optional-catch-binding': 'error',
    'unicorn/prefer-query-selector': 'error',
    'unicorn/prefer-reflect-apply': 'error',
    'unicorn/prefer-replace-all': 'off',
    'unicorn/prefer-set-has': 'error',
    'unicorn/prefer-spread': 'error',
    'unicorn/prefer-starts-ends-with': 'error',
    'unicorn/prefer-string-slice': 'error',
    'unicorn/prefer-text-content': 'error',
    'unicorn/prefer-trim-start-end': 'error',
    'unicorn/prefer-type-error': 'error',
    // Common abbreviations are known and readable
    'unicorn/prevent-abbreviations': 'off', // default value 'error'
    'unicorn/string-content': 'off',
    'unicorn/throw-new-error': 'error',
    // End Unicorn = = = = = = = = = = = = = = = = = = = = = = = = = =

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // JSDoc Rules (Default Values)
    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    "jsdoc/check-alignment": 1, // Recommended
    "jsdoc/check-examples": 1,
    "jsdoc/check-indentation": 1,
    "jsdoc/check-param-names": 1, // Recommended
    "jsdoc/check-syntax": 1,
    "jsdoc/check-tag-names": 1, // Recommended
    "jsdoc/check-types": 1, // Recommended
    "jsdoc/implements-on-classes": 1, // Recommended
    "jsdoc/match-description": 1,
    "jsdoc/newline-after-description": 1, // Recommended
    "jsdoc/no-types": 0, // Recommended 1
    "jsdoc/no-undefined-types": 1, // Recommended
    "jsdoc/require-description": 1,
    "jsdoc/require-description-complete-sentence": 1,
    "jsdoc/require-example": 0,
    "jsdoc/require-hyphen-before-param-description": 1,
    "jsdoc/require-jsdoc": 1, // Recommended
    "jsdoc/require-param": 1, // Recommended
    "jsdoc/require-param-description": 1, // Recommended
    "jsdoc/require-param-name": 1, // Recommended
    "jsdoc/require-param-type": 1, // Recommended
    "jsdoc/require-returns": 1, // Recommended
    "jsdoc/require-returns-check": 1, // Recommended
    "jsdoc/require-returns-description": 1, // Recommended
    "jsdoc/require-returns-type": 1, // Recommended
    "jsdoc/valid-types": 1 // Recommended
    // End JSDoc = = = = = = = = = = = = = = = = = = = = = = = = = = =
  },
  overrides: [
    {
      // Javascript File Override
      files: ['*.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      }
    },
    {
      files: ['*.spec.ts'],
      rules: {
        'max-classes-per-file': 'off',
      }
    }
  ]
}
