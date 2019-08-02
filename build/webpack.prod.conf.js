const common = require('./webpack.base.conf.js');
const merge = require('webpack-merge');
const uglyfyJsPlugin = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const optimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');


const webpackProdConfig = merge(common, {
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: extractTextWebpackPlugin.extract({
                  fallback: 'style-loader',
                  use: [{
                    loader: 'css-loader',
                    options: {
                      modules: true,
                      importLoaders: 1,
                    }
                  },
                  {
                    loader: 'postcss-loader'
                  }
                ],
                }),
            },
            {
                test: /\.s(a|c)ss$/,
                loader: extractTextWebpackPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                    {
                      loader: 'css-loader',
                      options: {
                        modules: true,
                        sourceMap: true,
                        importLoaders: 1
                      },
                    },
                    'sass-loader',
                    'postcss-loader'
                  ]
                }),
            },
        ],
    },
    plugins: [
        new uglyfyJsPlugin({   //打包清打印 + debugger
            sourceMap: true,
            uglifyOptions: {
                compress: {
                    drop_debugger: true,
                    drop_console: true,
                }
            }
        }),
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true
            }
        }),
        new optimizeCssPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: { removeAll: true }
            }
        }),
        new CleanWebpackPlugin(),
        new extractTextWebpackPlugin('css/[name].[hash].css'),

    ]
})

module.exports = webpackProdConfig;