const jwt = require('jsonwebtoken')
const handleRes = require('../utils/response')
const config = require('../config')
const mongoose = require('mongoose');


async function checkAuth(ctx, next) {
  let noAuthorize = false
  // if ()
  // const noAuthorize = ctx.path.includes('/users')
  if (noAuthorize) {
    return next()
  } else {
    const token = ctx.header.authorization
    try {
      // await jwt.verify(token, config.jwtSecret)
      const decoded = await jwt.verify(token, config.jwtSecret)
      ctx.state.user = {
        id: mongoose.Types.ObjectId(decoded.id),
      }
      return next()
    } catch(err) {
      handleRes({
        ctx,
        status: 401
      })
    }
  }
}
module.exports = checkAuth;