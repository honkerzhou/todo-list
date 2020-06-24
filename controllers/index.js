const Router = require('koa-router')
const usersRouter = require('./users')
const todosRouter = require('./todos')
const sessionsRouter = require('./sessions')

const router = new Router({
  prefix: '/api'
})

router.use(usersRouter.routes(), usersRouter.allowedMethods())
router.use(todosRouter.routes(), todosRouter.allowedMethods())
router.use(sessionsRouter.routes(), sessionsRouter.allowedMethods())

module.exports = router
