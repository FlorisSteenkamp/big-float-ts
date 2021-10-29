const path = require('path');
const ResolveTypeScriptPlugin = require("resolve-typescript-plugin").default;

module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
        plugins: [new ResolveTypeScriptPlugin({
            includeNodeModules: false
        })]
    },
    output: {
        filename: 'index.min.js',
        path: path.resolve(__dirname, 'browser'),
        library: 'BigFloat',
        libraryTarget: 'var'
    },
    stats: {
        // Don't display anything, then display colors, ...
        all: false,
        colors: true,
        errors: true,
        builtAt: true
    }
};