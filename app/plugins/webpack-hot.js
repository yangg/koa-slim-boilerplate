
const webpack = require('webpack')

module.exports = (config, app) => {
  const compiler = webpack(config)
  app.use(require('koa-convert')(require('koa-webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })))
  app.use(require('koa-convert')(require('koa-webpack-hot-middleware')(compiler)))
}
