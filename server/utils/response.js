/**
 * 自定义koa response对象主体的格式，以符合RestfulAPI

 * @param {Object} params 
 * @param {Object} params.ctx koa的上下文对象（context）
 * @param {Object} params.data 返回的数据
 * @param {number=} params.status 返回的状态码（可选），koa默认设置为404，但当主动设置ctx.body时，koa会自动将status设为200/204
 *   参见：https://github.com/koajs/koa/blob/master/docs/api/response.md中'response.body='一节
 */
function handleRes (params) {
  const ctx = params.ctx

  if (params.status) {
    ctx.status = params.status
  }

  switch (ctx.status) {
    case 401:
      ctx.body = {
        errors: [],
        message: '用户未通过认证'
      }
      break
    default:
      ctx.body = params.data
  }
}

module.exports = handleRes
