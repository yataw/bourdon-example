import paths from './config/paths';

export default {
    extends: [
        '@werkzeugkiste',
        '@werkzeugkiste/eslint-config/react',
        '@werkzeugkiste/eslint-config/typescript',
        '@werkzeugkiste/eslint-config/node',
    ],
    globals: {
        __BROWSER__: true,
        __SERVER__: true,
    },
    settings: {
        'import/resolver': {
            node: {
                paths: paths.resolveModules,
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
        'react': {
            version: 'detect',
        },
    },
    rules: {
        'import/no-unassigned-import': 0,
        'import/no-named-as-default-member': 0,
        'prettier/prettier': 'error',
        'import/order': 'off',
        'arrow-parens': 0,
        'no-return-assign': 0,
        'security/detect-object-injection': 0,
    },
    // overrides: [
    //     {
    //         files: ['*.ts', '*.tsx'],
    //         rules: {
    //             // TODO: add to eslint-config-wiremore
    //             'import/named': 0,
    //             'react/prop-types': 0,
    //         },
    //     },
    // ],
};
