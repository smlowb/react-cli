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