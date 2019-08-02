const common = require('./webpack.base.conf.js');
const merge = require('webpack-merge');
const uglyfyJsPlugin = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

const webpackProdConfig = merge(common, {
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

    ]
})

module.exports = webpackProdConfig;