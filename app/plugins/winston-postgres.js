
// https://github.com/adjoinant/winston-postgres

var util = require('util')
var winston = require('winston')
var pg = require('pg')
var url = require('url')

const _timestamp = function () {
  return new Date().toISOString()
}

function replaceErrors (key, value) {
  if (value instanceof Error) {
    var error = {}

    Object.getOwnPropertyNames(value).forEach(function (key) {
      error[key] = value[key]
    })
    return error
  }
  return value
}

var Postgres = exports.Postgres = function (options) {
  winston.Transport.call(this, options)
  options = options || {}

  this.timestamp = typeof options.timestamp !== 'undefined' ? options.timestamp : false

  if (options.connectionString) {
    var params = url.parse(options.connectionString)
    var auth = params.auth.split(':')

    this.config = {
      user: auth[0],
      password: auth[1],
      host: params.hostname,
      port: params.port,
      database: params.pathname.split('/')[1],
      ssl: options.ssl !== false,
      max: 10, // max number of clients in pool
      idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
    }
  } else {
    throw new Error('Postgres transport requires "connectionString".')
  }

  if (options.tableName || options.databaseFunction) {
    this.tableName = options.tableName
    this.sql = options.tableName
        ? 'INSERT INTO __TABLENAME (level, message, meta, created_at) values ($1, $2, $3, $4)'
        : 'SELECT ' + options.databaseFunction + '($1, $2, $3)'
  } else {
    throw new Error('Postgres transport requires "tableName" or "databaseFunction".')
  }

  this.ignoreMessage = options.ignoreMessage || function () { return false }

    // Winston Options
  this.name = 'postgres'
  this.level = options.level || 'info'

    // create the Postgres instance
  this.pool = new pg.Pool(this.config)
}

util.inherits(Postgres, winston.Transport)

Postgres.prototype.log = function (level, msg, meta, callback) {
  var self = this

    // should we skip this log message
  if (this.ignoreMessage(level, msg, meta)) {
    return callback(null, true)
  }

  var timestampFn = typeof this.timestamp === 'function'
          ? this.timestamp
          : _timestamp
  var timestamp = this.timestamp ? timestampFn() : undefined

    // use connection pool
  this.pool.connect((err, client, done) => {
        // fetching a connection from the pool, emit error if failed.
    if (err) {
      console.log(err)
      self.emit('error', err)
    }

    const sql = self.sql.replace('__TABLENAME', this.tableName(level))
    client.query(sql, [level, msg, JSON.stringify(meta, replaceErrors), timestamp], function (err, result) {
            // call `done()` to release the client back to the pool
      done()

            // executing statement, emit error if failed.
      if (err) {
        self.emit('error', err)
      }

            // acknowledge successful logging event
      self.emit('logged')
    })
  })

    // intially, tell the caller that everything was fine
  callback(null, true)
}

//
// Add Postgres to the transports defined by winston.
//
winston.transports.Postgres = Postgres
