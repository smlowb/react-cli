module.exports = {
    plugins: {
        'autoprefixer': {
        },
        'postcss-pxtorem': {
        'rootValue': 16,
        'unitPrecision': 5,
        'propList': ['foot', 'font-size', 'line-height', 'letter-spacing'],
        'replace': true,
        'mediaQuery': false,
        'minPixelValue': 0
        }
    }
}