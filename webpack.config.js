const path = require('path');
const GasPlugin = require('gas-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');
const webpack = require('webpack');

require('dotenv').config();

module.exports = {
    mode: 'development',
    entry: {
        main: './src/main.ts'
    },
    devtool: false,
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts',
            '.js'
        ]
    },
    plugins: [
        new GasPlugin(),
        new DotenvPlugin({
            sample: './.env.sample',
            path: './.env'
        }),
        // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, new RegExp(process.env.LOCALE)),
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
};
