
const appPackage = require('../package')
module.exports = (config) => ({
  name: appPackage.name,
  port: 3600,
  middleware: [
    'ignore',
    'koa-onerror',
    'logger',
    'assert-error',
    'action',
    'koa-session',
    // 'koa-flash',
    'koa-nunjucks-2',
    'koa-get-body'
  ],
  ignore: /\.map$/,
  'koa-get-body': { limits: { fileSize: 1024 * 1024 } },
  plugins: [
    'fundebug',
    'model'
  ],
  fundebug: {
    apikey: ''
  },
  extendConfigs: [ 'redis', 'extend', '[env]' ]
})
