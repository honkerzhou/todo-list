<template>
  <div>
    <LoginTip v-if="!loginFlag" />
    <el-tabs v-model="activeTab" type="border-card">
      <el-tab-pane label="今日待办" name="1">
        <el-row type="flex" justify="center">
          <el-button @click="addTodo">新增待办项</el-button>
        </el-row>
        <TodoList
          ref="todolist"
          :todos-data="todosData"
          @todo-be-done="todoBeDone"
          @edit-todo-undone="editTodoUndone"
          @forgo-todo-undone="forgoTodoUndone"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TodoList from "../components/TodoList"
import LoginTip from "../components/LoginTip"
import { mapState } from "vuex"

export default {
  name: "Index",
  components: {
    LoginTip,
    TodoList
  },
  data() {
    return {
      activeTab: "1",
      todosData: {}
    }
  },
  computed: {
    ...mapState(["loginFlag"])
  },
  created() {
    if (this.loginFlag) {
      this.getTodosData()
    } else {
      const todosDataLocal = localStorage.getItem("todosData")
      if (todosDataLocal) {
        this.todosData = JSON.parse(todosDataLocal)
      } else {
        this.todosData = {
          undone: [],
          done: [],
          forgone: []
        }
        localStorage.setItem("todosData", JSON.stringify(this.todosData))
      }
    }
  },
  methods: {
    // 获取所有待办项的数据
    getTodosData() {
      // return new Promise((resolve) => {
      //   Vue.prototype.$http
      //     .get("/todos", {
      //       params: {
      //         type: state.todoType
      //       }
      //     })
      //     .then(res => {
      //       commit('changeTodosData', {
      //         todosData: res.data
      //       })
      //       resolve()
      //     })
      //     .catch(err => {
      //       if (err.response) {
      //         Vue.prototype.$message.error(err.response.data)
      //       }
      //     })
      // })
    },
    // 前往新增待办项页面
    addTodo() {
      this.$router.push("/add")
    },
    // 前往待办事项编辑页面
    editTodoUndone(todo) {
      this.$router.push({
        name: "editTodo",
        params: {
          todo
        }
      })
    },
    /**
     * '做完啦'按钮点击时，即待处理待办项完成时触发
     *
     * @event button#click
     * @param {Array} idArr 包含所有勾选了的待办项id的数组
     */
    todoBeDone(idArr) {
      if (this.loginFlag) {
        // const idStr = this.initialCheckedTodos.join(":")
        // this.$http
        //   .patch(`/todos/${idStr}`, {
        //     status: 2
        //   })
        //   .then(() => {})
        //   .catch(err => {
        //     if (err.response) {
        //       this.$message.error(err.response.data)
        //     }
        //   })
      } else {
        let set = new Set(idArr)
        let done = this.todosData.undone.filter(item => set.has(item.id))
        let undone = this.todosData.undone.filter(item => !set.has(item.id))
        this.todosData.done = this.todosData.done.concat(done)
        this.todosData.undone = undone
        localStorage.setItem("todosData", JSON.stringify(this.todosData))
      }
      this.$refs.todolist.checkedTodos = []
      this.$refs.todolist.isIndeterminate = false
      this.$message.success("该待办项归类至已完成中")
      // this.getTodosData()
    },
    /**
     * '删除'按钮点击时触发，放弃该待办项
     *
     * @event button#click
     * @param {Object} todo 待办项对象
     */
    async forgoTodoUndone(todo) {
      if (this.loginFlag) {
        // try {
        //   await this.$http.patch(`/todos/${todo.id}`, { status: 3 })
        //   await this.getTodosData()
        // } catch (err) {
        //   if (err.response) {
        //     this.$message.error(err.response.data)
        //   }
        // }
      } else {
        this.todosData.undone = this.todosData.undone.filter(item => {
          if (item.id !== todo.id) {
            return item
          }
        })
        this.todosData.forgone.push(todo)
        localStorage.setItem("todosData", JSON.stringify(this.todosData))
      }

      // 删除的项如果在删除前是被勾选，则需从checkedTodos中剔除,并更改全选的状态
      if (this.$refs.todolist.checkedTodos.includes(todo.id)) {
        const todolistInstance = this.$refs.todolist
        const array = todolistInstance.checkedTodos.filter(todoId => {
          return todoId !== todo.id
        })
        todolistInstance.checkedTodos = array
        todolistInstance.handleCheckedTodosChange(array)
      }
      this.$message.success("该待办项归类至已放弃中")
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
