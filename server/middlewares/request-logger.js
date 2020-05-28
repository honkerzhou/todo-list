const logger = require('../utils/logger')

const requestLogger = async (ctx, next) => {
  logger.info('Method:', ctx.method)
  logger.info('Path:  ', ctx.path)
  logger.info('Body:  ', ctx.request.body)
  logger.info('---')
  await next()
}

module.exports = requestLogger