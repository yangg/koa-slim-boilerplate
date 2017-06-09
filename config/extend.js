
const redisStore = require('koa-redis')

const path = require('path')
const assets = {}

module.exports = function (config) {
  const viewNunjucks = {
    ext: 'html',
    path: path.join(__dirname, '../views/'),
    configureEnvironment: (env) => {
      env.addFilter('ver', function (path) {
        if (config.env === 'production' && assets.hasOwnProperty(path)) {
          return assets[path]
        }
        return path
      })
    }
  }
  return {
    'koa-nunjucks-2': viewNunjucks,
    postgres: require('./database')[config.env],
    'koa-session': {
      store: redisStore(config.redis)
    }
  }
}
