
const logger = require('winston')
require('../plugins/winston-postgres')
const morgan = require('koa-morgan')
const path = require('path')

module.exports = function (options, app) {
  options = Object.assign({
    dir: path.join(__dirname, '/../logs'),
    maxSize: 5 * 1024 * 2024
  })
  const isDebug = process.env.DEBUG
  const importLevels = ['error', 'warn', 'verbose']

  logger.configure({
    transports: [
      new logger.transports.Console({
        level: isDebug ? 'debug' : 'info',
        colorize: true,
        handleExceptions: true,
        humanReadableUnhandledException: true
      }),
      new logger.transports.File({
        level: 'info',
        maxsize: options.maxSize,
        handleExceptions: true,
        filename: path.join(options.dir, 'app.log')
      }),
      new logger.transports.Postgres({
        level: 'verbose',
        ssl: false,
        timestamp: true,
        handleExceptions: true,
        connectionString: app.config.postgres,
        tableName: (level) => level === 'verbose' ? 'action_records' : 'action_logs',
        ignoreMessage: function (level, message, metadata) {
          return importLevels.indexOf(level) === -1
        }
      })
    ],
    exitOnError: false
  })
  global.logger = logger

  return morgan(app.isDev ? 'dev' : 'combined', {
    stream: {
      write: function (msg, encoding) {
        if (app.isDev) {
          msg = msg.replace(/\u001b\[\d+m/g, '') // strip color in terminal
        }
        logger.info(msg.trim())
      }
    }
  })
}
