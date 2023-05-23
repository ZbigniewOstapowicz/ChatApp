const path = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: path(__dirname, '..', 'src', 'index.js'),
    },
    output: {
        filename: '[name].[contenthash:6].js',
        path: path(__dirname, '..', 'build')
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(mp3|wav|mpeg|ogg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'audio/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path(__dirname, '..', 'public', 'index.html'),
        })
    ]
}