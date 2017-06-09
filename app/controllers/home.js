
module.exports = (app, model) => {
  class Home {
    async index (ctx) {
      ctx.state.isProd = ctx.app.isProd
      await ctx.render('web', { name: 'Brook' })
    }
    async hello (ctx) {
      ctx.body = { isProd: ctx.app.isProd, isDev: ctx.app.isDev }
    }
  }
  return new Home()
}
