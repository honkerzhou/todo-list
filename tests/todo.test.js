const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const TodoModel = require('../models/todo')
const request = require('./@helpers/agent').request

const api = '/api/todos'
let token
beforeAll( async () => {
  const userData = await request.post('/api/sessions').send({
    username: 'zjh',
    password: '123456'
  })
  token = userData.body.token

  await TodoModel.deleteMany({})
})
// beforeEach( async () => {
//   await TodoModel.deleteMany({})
// })
afterAll(() => {
  mongoose.connection.close()
})


test('未登录用户创建待办项应该返回401错误', async () => {
  const res = await request.post(api).send([
    {
      content: '1',
      expectTime: new Date().toISOString()
    }
  ])
  expect(res.status).toBe(401)
})

test('待办项创建成功应该返回201', async () => {
  const res = await request.post(api).set('Authorization', `Bearer ${token}`).send({
    todoItems: [{
      content: '1',
      expectTime: new Date().toISOString()
    }]
  })
  expect(res.status).toBe(201)
})

test('待办项内容和完成时间应该是必填', async () => {
  const res = await request.post(api).set('Authorization', `Bearer ${token}`).send({
    todoItems: [{
      content: '',
      expectTime: null
    }]
  })
  expect(res.status).toBe(400)
})

test('应该返回一条未完成待办', async () => {
  const res = await request.get('/api/todos').set('Authorization', `Bearer ${token}`)
  expect(res.body.data.undone.length).toBe(1)
})

test('应该返回一条已废弃待办', async () => {
  const res1 = await request.get('/api/todos').set('Authorization', `Bearer ${token}`)
  const res2 = await request.patch(`/api/todos/${res1.undone[0].id}`).set('Authorization', `Bearer ${token}`)
    .send({
      status: 3
    })
  expect(res2.body.data.forgone.length).toBe(1)
})
