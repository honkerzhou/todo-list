const handleRes = require('../utils/response')

// 自定义的错误处理中间件，以符合RestfulAPI
async function handleErrors (ctx, next) {
  try {
    await next()
  } catch (e) {
    let message = ''
    const errors = []

    switch (e.name) {
      case 'ValidationError': {
        const errorFields = Object.keys(e.errors)

        errorFields.forEach(item => {
          errors.push({
            field: item
          })
          message += e.errors[item].message
        })

        handleRes({
          ctx,
          status: 400,
          data: {
            errors,
            message
          }
        })
        break
      }
      default:
        handleRes({
          ctx,
          status: 500,
          data: {
            errors,
            message: 'internal_server_error'
          }
        })
    }
  }
}

module.exports = handleErrors
