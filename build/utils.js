const extractTextWebpackPlugin = require('extract-text-webpack-plugin');

exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')
    return (severity, errors) => {
      if (severity !== 'error') return
  
      const error = errors[0]
      const filename = error.file && error.file.split('!').pop()
  
      notifier.notify({
        message: severity + ': ' + error.name,
        subtitle: filename || '',
      })
    }
  }


  exports.CssLoaderBack = (loader) => {
    console.log(process.env.NODE_ENV);
    return process.env.NODE_ENV === 'production' ? extractTextWebpackPlugin.extract(loader) :loader
  }