<template>
  <div class="wrapper">
    <el-tabs
      v-model="activeTab"
      type="border-card"
      class="content"
      @tab-click="handleTabClick"
    >
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.value"
        :label="tab.label"
        :name="tab.value"
      >
        <el-row
          type="flex"
          justify="center"
        >
          <el-col :span="2">
            <el-button @click="addTodo">新增待办项</el-button>
          </el-col>
        </el-row>
        <el-collapse v-model="collapseNames">
          <el-collapse-item
            title="待处理"
            name="1"
          >
            <TodoListUndone
              :todos="todosData.undone"
              @edit-todo-undone="editTodoUndone"
              @forgo-todo-undone="forgoTodoUndone"
              @todo-be-done="todoBeDone"
            />
          </el-collapse-item>
          <el-collapse-item
            title="已完成"
            name="2"
          >
            <div
              v-for="(item, index) in todosData.done"
              :key="item._id"
            >{{index+1}}、{{item.content}}</div>
          </el-collapse-item>
          <el-collapse-item
            title="已放弃"
            name="3"
          >
            <div
              v-for="(item, index) in todosData.forgone"
              :key="item._id"
            >{{index+1}}、{{item.content}}</div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TodoListUndone from "../components/TodoListUndone"

export default {
  components: {
    TodoListUndone
  },
  data() {
    return {
      tabs: [
        {
          value: "1",
          label: "今日待办"
        },
        // {
        //   value: "2",
        //   label: "周"
        // },
        // {
        //   value: "3",
        //   label: "月"
        // },
        // {
        //   value: "4",
        //   label: "年"
        // }
      ],
      activeTab: '1',
      collapseNames: ["1"],
      type: 1,
      todosData: {
        undone: [],
        done: [],
        forgone: []
      }
    }
  },
  created() {
    this.getTodoList()
  },
  methods: {
    handleTabClick(targetTab) {
      this.type = targetTab.name
      this.getTodoList()
    },
    todoBeDone(todos) {
      const idStr = todos.join(":")
      this.$http
        .patch(`/todos/${idStr}`, {
          status: 2
        })
        .then(() => {
          this.$message.success("该待办项归类至已完成中")
          this.getTodoList()
        })
        .catch(err => {
          if (err.response) {
            this.$message.error(err.response.data)
          }
        })
    },
    forgoTodoUndone(todo) {
      this.$confirm("确定放弃该待办项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .patch(`/todos/${todo._id}`, {
              status: 3
            })
            .then(() => {
              this.$message.success("该待办项归类至已放弃中")
              this.getTodoList()
            })
            .catch(err => {
              if (err.response) {
                this.$message.error(err.response.data)
              }
            })
        })
        .catch(() => {})
    },
    editTodoUndone(todo) {
      this.$router.push({
        name: "editTodo",
        params: {
          todo
        }
      })
    },

    /**
     * 创建todoList
     */
    addTodo() {
      this.$router.push("/add")
    },
    /**
     * 获取todoList
     * @param list  list名称
     */
    getTodoList() {
      this.$http
        .get("/todos", {
          params: {
            type: this.type
          }
        })
        .then(res => {
          this.todosData = res.data
        })
        .catch(err => {
          if (err.response) {
            this.$message.error(err.response.data)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  margin-top: 80px;
  .content {
    width: 90%;
    min-width: 350px;
    max-width: 1200px;
  }
}
</style>
