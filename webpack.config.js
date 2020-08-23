const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const BUILD_DIR = 'build';

const webpackDefaultConfig = {
    mode: '',
    entry: './src/App.ts',
    devtool: false,
    output: {
        path: path.resolve(__dirname, BUILD_DIR),
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.js', '.json', '.ts']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([BUILD_DIR], {
            root: __dirname,
            verbose: true
        }),
        new CopyWebpackPlugin([
            {
                from: 'public', to: ''
            }
        ]),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};

module.exports = webpackDefaultConfig;

