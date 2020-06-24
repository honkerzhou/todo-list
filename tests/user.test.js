const mongoose = require('mongoose')
const request = require('./@helpers/agent').request

const api = '/api/users'

test('用户创建成功应该返回201', async () => {
  const res = await request.post(api).send({
    username: 'zjh',
    password: '123456'
  })
  expect(res.status).toBe(201)
})


afterAll(() => {
  mongoose.connection.close()
})