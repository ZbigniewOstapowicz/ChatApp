const path = require('path');

module.exports = {
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public'),
        },
        port: 3000,
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.module\.s(a|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]',
                            }
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: './src/style/Variables.scss'
                        }
                    }
                ]
            },
            {
                test: /\.(s(a|c)ss|css)$/,
                exclude: /\.module.(s(a|c)ss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            },

        ],

    },
};