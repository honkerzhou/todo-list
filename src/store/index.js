import Vue from 'vue'
import Vuex from 'vuex'

// 安装Vuex
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 待办清单的所有数据
    todosData: {
      undone: [],
      done: [],
      forgone: []
    },

    // 待办事项类型：1日 2周 3月 4年
    todoType: 1
  },
  mutations: {
    // 修改待办清单的所有数据
    changeTodosData(state, payload) {
      state.todosData = payload.todosData
    }
  },
  actions: {
    // 获取所有待办项的数据
    getTodosData({ state, commit }) {
      return new Promise((resolve) => {
        Vue.prototype.$http
          .get("/todos", {
            params: {
              type: state.todoType
            }
          })
          .then(res => {
            commit('changeTodosData', {
              todosData: res.data
            })
            resolve()
          })
          .catch(err => {
            if (err.response) {
              Vue.prototype.$message.error(err.response.data)
            }
          })
      })
    }
  }
})