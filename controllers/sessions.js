const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Router = require('koa-router')
const sessionsRouter = new Router({
  prefix: '/sessions'
})

const config = require('../utils/config')
const UserModel = require('../models/user')

// 根据用户名和密码校验用户是否存在，存在则提供token
sessionsRouter.post('/', async (ctx) => {
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
  const userData = await UserModel.findOne({
    username
  })

  const passwordCorrect = userData === null ?
    false :
    await bcrypt.compare(password, userData.passwordHash)

  if (!(userData && passwordCorrect)) {
    ctx.status = 400
    ctx.body = {
      message: '用户名或密码错误'
    }
    return
  }

  const token = jwt.sign({
    id: userData.id
  }, config.JWT_SECRET, {
    expiresIn: 60
  })
  ctx.status = 200
  ctx.body = {
    token
  }
})

module.exports = sessionsRouter