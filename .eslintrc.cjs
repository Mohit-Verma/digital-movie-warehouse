// eslint-disable-next-line no-undef
module.exports = {
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {ecmaVersion: 'latest', sourceType: 'module'},
    plugins: ['react-refresh'],
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        'react-refresh/only-export-components': 'warn',
        'indent': [2, 4, {'SwitchCase':  1}],
        'linebreak-style': 0,
        'quotes': [2, 'single'],
        'semi': [2, 'always'],
        'react/react-in-jsx-scope': 0,
        'object-curly-spacing': [2, 'never'],
        'no-console': [2, {'allow': ['info', 'warn', 'error']}],
        'camelcase': [1, {'properties': 'never', 'ignoreDestructuring': true, 'allow': ['UNSAFE_.*']}],
        'comma-dangle': [1, 'never'],
        'react/jsx-tag-spacing': 1,
        'jsx-quotes': [2, 'prefer-double'],
        'max-len': [2, {
            'code': 120,
            'ignorePattern': '^(import|export)',
            'ignoreUrls': true,
            'ignoreStrings': true,
            'ignoreComments': true,
            'ignoreTrailingComments': true,
            'ignoreTemplateLiterals': true,
            'ignoreRegExpLiterals': true
        }]
    }
};
