
const Koa = require('koa')

const app = new Koa()

require('koa-slim')(app)

app.isDev && app.use(require('koa-static')(require('path').join(__dirname, 'public')))
