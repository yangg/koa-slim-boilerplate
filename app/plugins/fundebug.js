
module.exports = (options, app) => {
  // dont's silent fundebug via silent option, will cause uncaughtException silent
  if (!app.isProd) {
    return
  }
  const fundebug = require('fundebug-nodejs')
  fundebug.config(Object.assign({
    releaseStage: app.env
  }, options))
  // uncaughtException is captured by default
  app.on('error', fundebug.KoaErrorHandler)
}
