function handleRes(params) {
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