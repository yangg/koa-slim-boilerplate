
// 不需要登录就可以访问的路由
// const publicRoutes = [
//   '/admin/checkLogin'
// ]
module.exports = (router, app) => {
  // router.all('*', (ctx, next) => {
  //   if (!(ctx.path.indexOf('/web') > -1 || publicRoutes.indexOf(ctx.path) > -1)) {
  //     ctx.assert(ctx.session.user, 403, '未登录或登录已过期！')
  //   }
  //   return next()
  // })
  const home = app.getController('home')
  router.get('/', home.index)
  router.get('/hello', home.hello)
}
