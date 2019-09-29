const TodoModel = require('../db/models/todo')
const handleRes = require('../utils/response')
const mongoose = require('mongoose')

module.exports = {
  getTodos: async (ctx) => {
    const ownerId = ctx.state.user.id
    const todosArr = await TodoModel.aggregate([
      {
        $match: { ownerId, type: parseInt(ctx.query.type) }
      },
      {
        $group: {
          _id: { status: '$status' },
          todos: { $push: '$$ROOT' }
        }
      }
    ])
    const data = {
      undone: [],
      done: [],
      forgone: []
    }
    todosArr.forEach(item => {
      switch (item._id.status) {
        case 1:
          data.undone = [...item.todos]
          break
        case 2:
          data.done = [...item.todos]
          break
        case 3:
          data.forgone = [...item.todos]
          break
      }
    })
    handleRes({
      ctx,
      data
    })
  },
  addTodo: async (ctx) => {
    const ownerId = ctx.state.user.id
    const todos = ctx.request.body.todoItems.map(todo => {
      return { ...todo, ownerId }
    })
    const data = await TodoModel.create(todos)
    handleRes({
      ctx,
      status: 201,
      data
    })
  },
  updateTodo: async (ctx) => {
    const idArr = ctx.params._id.split(':')
    const objectIdArr = idArr.map(id => {
      return mongoose.Types.ObjectId(id)
    })
    // data = await TodoModel.findByIdAndUpdate(id, ctx.request.body)
    const data = await TodoModel.update(
      { _id: { $in: objectIdArr } },
      { $set: ctx.request.body },
      { multi: true }
    )
    handleRes({
      ctx,
      data
    })
  },
  deleteTodo: async (ctx) => {
    const id = ctx.params._id
    const data = await TodoModel.findByIdAndDelete(id)
    handleRes({
      ctx,
      status: 204,
      data
    })
  }
}
