const jwt = require('jsonwebtoken')
const handleRes = require('../utils/response')
const config = require('../config')
const mongoose = require('mongoose')

// 自定义的权限验证中间件，使用jwt
async function checkAuth(ctx, next) {
  const token = ctx.header.authorization

  try {
    const decoded = await jwt.verify(token, config.jwtSecret)
    ctx.state.user = {
      id: mongoose.Types.ObjectId(decoded.id)
    }
    return next()
  } catch (err) {
    handleRes({
      ctx,
      status: 401
    })
  }
}

module.exports = checkAuth
