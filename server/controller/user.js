const UserModel = require('../db/models/user')
const handleRes = require('../utils/response')
const jwt = require('jsonwebtoken')

module.exports = {
  addUser: async (ctx) => {
    const { username, password } = ctx.request.body
    const data = await UserModel.create({ username, password })
    const token = jwt.sign({
      id: data.id
    }, 'todoListByHonkerzhou', {
      expiresIn: '1h'
    })
    handleRes({
      ctx,
      status: 201,
      data: {
        token
      }
    })
  },
  validUser: async (ctx) => {
    const { username, password } = ctx.request.body
    const userData = await UserModel.findOne({
      username
    })
    if (userData) {
      if (userData.password === password) {
        const token = jwt.sign({
          id: userData.id
        }, 'todoListByHonkerzhou', {
          expiresIn: '1h'
        })
        handleRes({
          ctx,
          data: {
            token
          }
        })
      } else {
        handleRes({
          ctx,
          status: 400,
          data: {
            errors: [{
              field: 'password'
            }],
            message: '密码错误'
          }
        })
      }
    } else {
      handleRes({
        ctx,
        status: 400,
        data: {
          errors: [{
            field: 'username'
          }],
          message: '用户不存在'
        }
      })
    }
  }
}
