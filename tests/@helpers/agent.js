const http = require('http')
const supertest = require('supertest')
const app = require('../../app')

const request = supertest(http.createServer(app.callback()))

function makeAgent() {
  return supertest.agent(http.createServer(app.callback()))
}
exports = module.exports = {
  request,
  makeAgent
}