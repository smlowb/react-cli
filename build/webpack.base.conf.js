const path = require('path');
const config = require('./config.js');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const progressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    entry:  path.resolve(__dirname, '../src/index.js'),
    mode: process.env.NODE_ENV,
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devServer: {
        ...config.devServer
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader' }],
            },
            {
                test: /\.css$/,
                loader: extractTextWebpackPlugin.extract({
                  fallback: 'style-loader',
                  use: [{
                    loader: 'css-loader',
                    options: {
                      modules: true,
                    }
                  }],
                }),
                // use: ['style-loader', 'css-loader?modules'],
                // exclude: /node_modules/
            },
            {
                test: /\.s(c|a)ss$/,
                // loader: 'sass-loader',
                loader: extractTextWebpackPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                    {
                      loader: 'css-loader',
                      options: {
                        modules: true,
                        sourceMap: true,
                        importLoaders: 2
                      },
                    },
                    'sass-loader'
                  ]
                }),
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                }
              },
              {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                }
              },
              {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                }
              }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
        }),
        new CleanWebpackPlugin(),
        new extractTextWebpackPlugin('[name].[hash].css'),
        new progressBarPlugin({
          complete: '🐷',
        })
    ]
}