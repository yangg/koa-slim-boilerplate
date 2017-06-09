
const uaParser = require('ua-parser-js')
module.exports = function () {
  return (ctx, next) => {
    ctx.action = (action, meta) => {
      const user = ctx.session.user || {}
      const recordData = Object.assign({
        id: user.id,
        username: user.username,
        level: user.level,
        name: user.name,
        ip: ctx.request.ip,
        ua: uaParser(ctx.get('user-agent'))
      }, meta)
      logger.verbose(action, recordData)
    }
    return next()
  }
}
