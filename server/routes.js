const Router = require('koa-router')
const checkAuth = require('./middlewares/check-auth')
const userController = require('./controller/user')
const todoController = require('./controller/todo')

const router = new Router()

// router.use('/todos', function (ctx, next) {
//   return next().then(function () {
//     console.log('Middleware done');
//   });
// });

router
  .post('/users', userController.addUser)
  .post('/sessions', userController.validUser)
  .get('/todos', checkAuth, todoController.getTodos)
  .post('/todos', checkAuth, todoController.addTodo)
  .patch('/todos/:_id', checkAuth, todoController.updateTodo)
  // .delete('/todos/:_id', checkAuth, todoController.deleteTodo)

module.exports = router
