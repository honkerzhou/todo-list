import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// import ELEMENT from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(ELEMENT)
import {
  Button, Input, Checkbox, CheckboxGroup, Row, Col, Form, FormItem, TimePicker, Tabs,
  TabPane, Collapse, CollapseItem, Radio, RadioGroup, Message
} from 'element-ui'
Vue.use(Button)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(TimePicker)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.prototype.$message = Message

const axiosInstance = axios.create({
  baseURL: '/api'
})
// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // 用户未通过服务器验证时，需进入登录页面重新登录
  if (error.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(error)
})
Vue.prototype.$http = axiosInstance

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
