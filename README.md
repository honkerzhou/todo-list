# todo-list-server &middot; [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
一个体验全栈开发的由浅入深练手项目，前后端分离。本仓库为后端部分，后端部分见[todo-list-client](https://github.com/honkerzhou/todo-list-client)  
前端：Vue CLI 4.x + Vue 2.x + Vue Router + Vuex + Element-UI + Axios + ES6  
后端：Node.js(Koa2) + MongoDB + Restful API   
测试：Jest 

如果有兴趣的话，欢迎大家加入，随意造作
## Features
- 离线可用
- JWT用户验证
- REST风格的 API
- ......

## Resource
在线地址：[todo.honkerzhou.com](http://todo.honkerzhou.com)  
体验账号/密码：honkerzhou  
配套教程（完善中）：[手把手带你入门全栈](https://honkerzhou.com/tutorial/todo-list/)


## Installing / Getting started
```shell
git clone https://github.com/honkerzhou/todo-list-server.git
cd todo-list-server
npm install
touch .env
```
在`.env`文件中写入并保存：
```
MONGODB_URI='mongodb://localhost/todolist'
TEST_MONGODB_URI='mongodb://localhost/todolist-test'
PORT=5000
JWT_SECRET='todoListByHonkerzhou'
```
然后运行
```shell
npm run dev
```
运行完后，接口运行在`http://localhost:5000/`，可通过以下方式体验：
1. [postman](https://www.postman.com/)
2. 与前端部分[todo-list-client](https://github.com/honkerzhou/todo-list-client)配合使用，在浏览器观察HTTP请求与响应
3. 如果你使用的是`VS Code`,可以使用`REST Client`插件，并配合`requests`目录下的请求文件体验，具体方法：


建议先行阅读`REST Client`插件的文档：[vscode-restclient](https://github.com/Huachao/vscode-restclient)后再阅读以下步骤

先在`VS Code`的`settings.json`加入以下配置：
```json
// REST Client插件配置
"rest-client.environmentVariables": {
  "$shared": {
    "nonProdToken": "这里放token"
  },
  "local": {
    "host": "localhost:5000",
    "token": "{{$shared nonProdToken}}",
  },
  "production": {
    "host": "example.com",
    "token": "{{$shared prodToken}}",
  }
}
```
保存后，快捷键`Ctrl+Shift+p`打开命令面板，输入`Rest Client: Switch Environment`，单击进入切换环境，切换为`local`  

然后在`request/users.rest`发送请求，注册一个用户，将接口返回的`token`粘贴到`VS Code`的`settings.json`下刚刚配置的“REST Client插件配置”中的`nonProdToken`处，保存后即可使用`requests`目录下的其他请求文件


## Developing

### Built With
1. Koa2

### Prerequisites
1. Node.js >= 12.x
2. MongoDB >= 4.2


### Setting up Dev
没啥要求，遵守GitHub Flow就行

### Deploying / Publishing
暂无

## Configuration
暂无

## Tests
```shell
npm run test
```

## Style guide

[Standard](https://github.com/standard/standard)

## Api Reference
暂无


## Todos

- [ ] HTTP缓存
- [ ] 单元测试
- [ ] E2E测试
- [ ] 开发V2版本
  - [ ] 每日待办重置（可选择恢复前一日未做完的待办）
  - [ ] 历史待办清单

## Licensing
[MIT](./LICENSE)





