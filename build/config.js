const config = {
    devServer: {
        port: 3000,
        host: 'localhost',
        open: false,
        overlay: { warning: false, errors: true },
        quiet: true,
        watchOptions: {
            poll: false
        }
    },
    dev: {

    },
    build: {
        
    }
};

module.exports = config;