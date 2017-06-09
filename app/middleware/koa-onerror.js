
const status = require('statuses')
status[460] = 'Client Error'
status[560] = 'Server Error'

const trivialStatus = [
  403,
  404,
  460, // 客户端错误
  560  // 服务端捕获的异常，少用，use 500
]

function onError (options, app) {
  return async (ctx, next) => {
    try {
      await next()
      if (ctx.status === 404) {
        ctx.throw(404, 'Page not found')
      }
    } catch (err) {
      if (typeof err.status !== 'number') {
        err.status = 500
      }
      const errObj = { status: err.status, error: err.message }
      if (ctx.app.env !== 'production') {
        // Print stack in non-production
        if (err.stack && (trivialStatus.indexOf(err.status) === -1)) {
          errObj.error = err.stack
        }
      }
      if (trivialStatus.indexOf(err.status) === -1) {
        logger.error(err)
      }
      ctx.status = err.status
      const acceptType = ctx.accepts('html', 'json')
      switch (acceptType) {
        case 'json':
          ctx.body = errObj
          break
        default:
          await ctx.render('error', errObj)
          break
      }
    }
  }
}

module.exports = onError
