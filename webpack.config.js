const path = require('path');

const common = {
    mode: 'production',
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(j|t)s?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
        ],
    },
};

const entries = {
    index: path.join(__dirname, './src/index.ts'),
    browser: path.join(__dirname, './src/browser.ts'),
    legacy: path.join(__dirname, './src/legacy.ts'),
};

module.exports = (env = {}) => {
    const format = env.format || 'umd';

    if (format === 'umd') {
        return {
            ...common,
            entry: entries.index,
            output: {
                path: path.join(__dirname, 'dist'),
                filename: 'build.js',
                library: {
                    type: 'umd',
                },
                globalObject: 'globalThis',
            },
        };
    }

    if (format === 'cjs') {
        return {
            ...common,
            entry: entries,
            output: {
                path: path.join(__dirname, 'dist'),
                filename: '[name].cjs',
                library: {
                    type: 'commonjs2',
                },
                globalObject: 'globalThis',
            },
        };
    }

    if (format === 'esm') {
        return {
            ...common,
            entry: entries,
            experiments: {
                outputModule: true,
            },
            output: {
                path: path.join(__dirname, 'dist'),
                filename: '[name].mjs',
                library: {
                    type: 'module',
                },
                module: true,
            },
        };
    }

    throw new Error(`Unknown build format: ${format}`);
};
