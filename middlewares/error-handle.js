const logger = require('../utils/logger')

// 自定义的错误处理中间件，以符合RestfulAPI
const errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    logger.error(error.message)

    switch (error.name) {
      case 'CastError': {
        ctx.status = 400
        ctx.body = {
            message: 'malformatted id'
        }
        break
      }
      case 'ValidationError': {
        const errorFields = Object.keys(error.errors)
        let message = ''
        errorFields.forEach(item => {
          message += error.errors[item].message
        })
        ctx.status = 400
        ctx.body = {
            message
        }
        break
      }
      // 自定义koa-jwt模块token认证失败抛出的错误
      case 'UnauthorizedError': {
        if (error.originalError.name === 'TokenExpiredError') {
          ctx.status = 403
          ctx.body = {
            message: '登录有效期过期，请重新登录'
          }
        } else {
          ctx.status = 401
          ctx.body = {
            message: '请先登录'
          }
        }
        
        break
      }
      default:
        ctx.status = 500
        ctx.body = {
            message: 'Internal Server Error'
        }
    }
  }
  
}

module.exports = errorHandler
