# todo-list
一个体验全栈开发的入门级练手项目，前后端分离。  
前端：Vue CLI 3.x + Vue 2.x + Vue Router + Element-UI + Axios + ES6  
后端：Node.js(Koa2) + MongoDB + Restful API  

为什么要写这个项目？
1. **志当存高远**：  
   现在前后端的工作越来越细化，日常工作中只使用那么一点基础知识就完全可以胜任（目前蜷缩在某小公司努力发光），但我辈身处信息洪流中，岂甘做一井底蛙？  
   怎么办？看书学，看文档学，看代码学；  
   学了就忘，怎么办？重新看，边看边用，边用边总结。
2. **拥抱未知技术，满足市场需求**：  
   对于后端，一直是我这个小前端未知的领域，打通后端，无异于是打通了程序员编码生涯的“任督二脉”。但自我式的探索未知领域，不能盲目的给自己创造阻力，既要能满足新奇感的阻力也得要有持续性的正向反馈，故而也是针对当前市场需求，选择了这个技术方案。
3. **自我约束，助力成长**  
   虽然这个项目实现的是烂大街的简单的待办清单，但待办清单本身同时也是一个生活管理工具，能够体现出一个人的自律性，送一句话大家共勉：“自律的人不一定成功，但成功的人一定自律”。

如果有兴趣的话，欢迎大家加入，随意造作（doc目录下有个简丑的原型:joy:）。
## 特性
- JWT用户验证
- Restful API
- 响应式布局（略丑，待完善）
- ......
## 项目资源
在线地址：[todo.honkerzhou.com](http://todo.honkerzhou.com)  
配套教程：[手把手带你入门全栈](https://honkerzhou.com/tutorial/todo-list/)
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
- [ ] 规范化代码
- [ ] 美化和优化界面
- [ ] 首屏渲染性能优化
## License
[Apache2.0](./LICENSE)

