const baseWebpackConfig = require('./webpack.base.conf.js');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const merge = require('webpack-merge');
const config = require('./config');
const utils = require('./utils');
const portfinder = require('portfinder');

const devWebpackConfig = merge(baseWebpackConfig, {})


module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = config.devServer.port;
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err);
        } else {
            process.env.PORT = port;
            devWebpackConfig.devServer.port = port;
            devWebpackConfig.plugins.push(
                new FriendlyErrorsPlugin({
                    compilationSuccessInfo: {
                        messages: [`Your application is running here: http://${config.devServer.host}:${port}`],
                        onError: utils.createNotifierCallback()
                      },
                })
            )
            resolve(devWebpackConfig);
        }
    })
})