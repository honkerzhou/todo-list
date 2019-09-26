import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Register from '@/views/Register'
import TodoList from '@/views/TodoList'
import AddTodo from '@/views/AddTodo'
import EditTodo from '@/views/EditTodo'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: 'todoList',
      component: TodoList,
      meta: {
        requireAuth: true // flag标识此路由需要登录
      }
    },
    {
      path: '/add',
      name: 'addTodo',
      component: AddTodo,
      meta: {
        requireAuth: true // flag标识此路由需要登录
      }
    },
    {
      path: '/edit',
      name: 'editTodo',
      component: EditTodo,
      meta: {
        requireAuth: true // flag标识此路由需要登录
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = localStorage.getItem('token')
    if (token) {
      Vue.prototype.$http.defaults.headers.common['Authorization'] = token
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
