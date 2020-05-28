const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Router = require('koa-router')

const UserModel = require('../models/user')
const config = require('../utils/config')

const usersRouter = new Router({
  prefix: '/users'
})
// 添加用户
usersRouter.post('/', async (ctx) => {
  const {
    username,
    password
  } = ctx.request.body

  if (!username || !password) {
    ctx.status = 400
    ctx.body = {
      error: '用户名或密码不能为空'
    }
    return
  } else if (password.length < 6) {
    ctx.status = 400
    ctx.body = {
      error: '密码长度至少为6位'
    }
    return
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const userData = await UserModel.create({
    username,
    passwordHash
  })
  const token = jwt.sign({
    id: userData.id
  }, config.JWT_SECRET, {
    expiresIn: '1h'
  })
  ctx.status = 201
  ctx.body = {
    token
  }
})

module.exports = usersRouter