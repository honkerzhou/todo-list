<template>
  <div>
    <el-checkbox
      v-if="todos.length > 0"
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    >全选</el-checkbox>
    <!-- <div style="margin: 15px 0;"></div> -->
    <el-checkbox-group
      v-model="checkedTodos"
      @change="handleCheckedTodosChange"
    >
      <el-row
        v-for="todo in todos"
        :key="todo._id"
        :gutter="10"
        type="flex"
        justify="space-between"
        class="todo-row"
      >
        <el-col
          :xs="18"
          :sm="22"
        >
          <el-checkbox
            :label="todo._id"
          >{{todo.content}}</el-checkbox>
        </el-col>
        <el-col
          :xs="6"
          :sm="2"
        >
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            circle
            @click="$emit('edit-todo-undone', todo)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            @click="$emit('forgo-todo-undone', todo)"
          ></el-button>
        </el-col>
      </el-row>
    </el-checkbox-group>
    <el-row type="flex" justify="center" v-show="checkedTodos.length > 0">
      <el-col :span="2">
        <el-button type="primary" @click="$emit('todo-be-done', checkedTodos)">做完啦</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    todos: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isIndeterminate: false,
      checkAll: false,
      checkedTodos: []
    }
  },
  watch: {
    todos() {
      this.checkedTodos = []
      this.isIndeterminate = false
    }
  },
  methods: {
    handleCheckAllChange(val) {
      if (val) {
        this.checkedTodos = this.todos.map(todo => {
          return todo._id
        })
      } else {
        this.checkedTodos = []
      }
      this.isIndeterminate = false
    },
    handleCheckedTodosChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.todos.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.todos.length
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-row {
  align-items: center;
  margin: 10px 0;
  ::v-deep .el-checkbox__label {
    vertical-align: middle;
    white-space: normal;
  }
}

</style>