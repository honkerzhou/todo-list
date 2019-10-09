const Router = require('koa-router')
const checkAuth = require('./middlewares/check-auth')
const userController = require('./controller/user')
const todoController = require('./controller/todo')

const router = new Router()

router
  .post('/users', userController.addUser)
  .post('/sessions', userController.validUser)
  .get('/todos', checkAuth, todoController.getTodos)
  .post('/todos', checkAuth, todoController.addTodo)
  .patch('/todos/:_id', checkAuth, todoController.updateTodo)

module.exports = router
