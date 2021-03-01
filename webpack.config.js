const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devServer: {
        historyApiFallback: true,
        contentBase: './public/',
        hot: true,
        clientLogLevel: 'silent'
    },
    entry: [resolve(__dirname, 'src/index.tsx')],
    output: {
        path: resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    externals: {},
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: ['@babel/env', '@babel/react']
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.svg(\?.*)?$/, // match img.svg and img.svg?param=value
                use: [
                    'svg-url-loader', // or file-loader or svg-url-loader
                    'svg-transform-loader'
                ]
            }
        ]
    }
}