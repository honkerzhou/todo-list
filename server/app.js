const path = require('path')
const mongoose = require('mongoose')
const Koa = require('koa')
const koaBodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const koaCors = require('koa2-cors')
const koaJwt = require('koa-jwt')

const errorHandler = require('./middlewares/error-handle')
const requestLogger = require('./middlewares/request-logger')

const config = require('./utils/config')
const router = require('./controllers')
const logger = require('./utils/logger')

const app = new Koa()

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(result => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected')
})

app.use(errorHandler)
app.use(koaCors())
app.use(koaStatic(path.resolve(__dirname, '../dist')))
app.use(koaBodyParser())
app.use(requestLogger)
app.use(koaJwt({
  secret: config.JWT_SECRET
}).unless({
  path: ['/api/users', '/api/sessions']
}))
app.use(router.routes(), router.allowedMethods())

module.exports = app