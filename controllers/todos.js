const mongoose = require('mongoose')
const Router = require('koa-router')
const todosRouter = new Router({
  prefix: '/todos'
})

const UserModel = require('../models/user')
const TodoModel = require('../models/todo')

// 根据用户id和待办事项类型查找相应待办事项
todosRouter.get('/', async (ctx) => {
  const userId = ctx.state.user.id
  const userWithTodos = await UserModel.findById(userId).populate({
    path: 'todos',
    // select: 'todos'
  })

  // 将查找到的待办事项按待办事项的状态分组
  const data = {
    undone: [],
    done: [],
    forgone: []
  }
  userWithTodos.todos.forEach(item => {
    switch (item.status) {
      case 1:
        data.undone.push(item)
        break
      case 2:
        data.done.push(item)
        break
      case 3:
        data.forgone.push(item)
        break
    }
  })
  ctx.status = 200
  ctx.body = data
})

// 新增待办项
todosRouter.post('/', async (ctx) => {
  const ownerId = ctx.state.user.id
  const todos = ctx.request.body.todoItems.map(todo => {
    return {
      ...todo,
      ownerId
    }
  })
  const data = await TodoModel.create(todos)
  const todosIdArr = data.map(item => item._id)
  const user = await UserModel.findById(ownerId)
  user.todos = user.todos.concat(todosIdArr)
  await user.save()

  ctx.status = 201
  ctx.body = {
    data
  }
})

// 更新 单个待办项 的状态
todosRouter.patch('/:id', async (ctx) => {
  const { id } = ctx.params
  const data = await TodoModel.findByIdAndUpdate(id, ctx.request.body, {
    new: true,
    omitUndefined: true
  })

  ctx.body = {
    data
  }
})

// 批量更新 多个待办项 的状态
todosRouter.patch('/', async (ctx) => {
  const { todoIdArr, status } = ctx.request.body
  const data = await TodoModel.updateMany({
    _id: {
      $in: todoIdArr
    }
  }, {
    $set: {status}
  })

  ctx.body = {
    data
  }
})

module.exports = todosRouter