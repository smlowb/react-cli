const path = require('path');
const config = require('./config.js');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const progressBarPlugin = require('progress-bar-webpack-plugin');
const utils = require('./utils');

module.exports = {
    entry:  path.resolve(__dirname, '../src/index.js'),
    output: {
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[id].[chunkhash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    devServer: {
        ...config.devServer
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader' }],
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
   
        new progressBarPlugin({
          complete: '🐷',
        })
    ]
}