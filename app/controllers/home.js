
module.exports = (app, model) => {
  class Home {
    async index (ctx) {
      // ctx.state.isProd = ctx.app.isProd
      // await ctx.render('web', { name: 'Brook' })
      ctx.body = `${process.env.npm_package_name}@${process.env.npm_package_version}`
    }
    async hello (ctx) {
      ctx.body = { isProd: ctx.app.isProd, isDev: ctx.app.isDev }
    }
  }
  return new Home()
}
