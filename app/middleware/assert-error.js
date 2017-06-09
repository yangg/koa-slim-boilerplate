module.exports = function () {
  return (ctx, next) => {
    ctx.assertError = (data, msg = data.message, status = 460) => {
      const isError = (data instanceof Error)
      ctx.assert(!isError, status, msg)
    }
    return next()
  }
}
