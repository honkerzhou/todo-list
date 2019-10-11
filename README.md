# todo-list
一个体验全栈开发的入门级练手项目，前后端分离。  
前端：Vue CLI 3.x + Vue 2.x + Vue Router + Vuex + Element-UI + Axios + ES6  
后端：Node.js(Koa2) + MongoDB + Restful API  


如果有兴趣的话，欢迎大家加入，随意造作（doc目录下有个简丑的原型:joy:）。
## 特性
- JWT用户验证
- Restful API
- 响应式布局（略丑，待完善）
- ......
## 项目资源
在线地址：[todo.honkerzhou.com](http://todo.honkerzhou.com)  
体验账号/密码：honkerzhou  
配套教程（完善中）：[手把手带你入门全栈](https://honkerzhou.com/tutorial/todo-list/)
## 运行项目
1. 先clone代码到本地
    ```sh
    git clone https://github.com/honkerzhou/todo-list.git
    ```
2. 再启动前端
    ```sh
    cd todo-list
    npm install
    npm run dev
    ```
3. 最后启动后端(前提是已经安装了MongoDB)
    ```sh
    cd server
    npm install
    npm run dev
    ```
## 准备做
- [ ] 为该项目写一个新手教程
  - [x] 项目介绍
  - [x] 项目准备
  - [ ] koa知识讲解
  - [ ] mongoose知识讲解
  - [ ] restful api知识讲解
  - [ ] jwt用户验证知识讲解
  - [ ] vue知识讲解
  - [ ] vue-router知识讲解
- [x] 规范化代码并添加代码注释
- [ ] 美化和优化界面
  - [x] 修复问题: 待处理事项数目变动时，`做完啦`的按钮没有隐藏
  - [x] 修复问题: 待办内容比较长时，文字不换行显示
- [ ] 首屏渲染性能优化
  - [x] Element UI 按需加载(`chunk-vendors.js`从803KB降至321KB，目标244KB)
  - [x] 路由懒加载
  - [ ] 使用 CDN 外部加载资源（今天尝试了一下，有两个问题：1、CDN可能会挂；2、开发和线上环境暂时无法完全分离配置，待继续研究）
- [ ] 开发V2版本
  - [ ] 每日待办重置（可选择恢复前一日未做完的待办）
  - [ ] 历史待办清单
## License
[Apache2.0](./LICENSE)

