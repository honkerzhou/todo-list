import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000/api/v1'
})
// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {

  // 用户未通过服务器验证时，需进入登录页面重新登录
  if (error.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(error);
});
Vue.prototype.$http = axiosInstance

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
