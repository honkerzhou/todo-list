<template>
  <div>
    <el-collapse v-model="collapseNames">
      <el-collapse-item title="待处理" name="1">
        <el-checkbox
          v-show="todosData.undone && todosData.undone.length > 0"
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <el-checkbox-group v-model="checkedTodos" @change="handleCheckedTodosChange">
          <el-row
            v-for="todo in todosData.undone"
            :key="todo.id"
            :gutter="10"
            type="flex"
            justify="space-between"
            class="todo-row"
          >
            <el-col :xs="18" :sm="22">
              <el-checkbox :label="todo.id">{{todo.content}}</el-checkbox>
            </el-col>
            <el-col :xs="6" :sm="2">
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
          <el-button type="primary" @click="$emit('todo-be-done', checkedTodos)">做完啦</el-button>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="已完成" name="2">
        <div v-for="(item, index) in todosData.done" :key="item.id">{{index+1}}、{{item.content}}</div>
      </el-collapse-item>
      <el-collapse-item title="已放弃" name="3">
        <div v-for="(item, index) in todosData.forgone" :key="item.id">{{index+1}}、{{item.content}}</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  props: {
    todosData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      collapseNames: ["1"],
      checkAll: false,
      checkedTodos: [],
      isIndeterminate: false
    }
  },
  methods: {
    /**
     * 全选复选框值变动时触发
     *
     * @param {Boolean} val 复选框变动后的值
     */
    handleCheckAllChange(val) {
      if (val) {
        this.checkedTodos = this.todosData.undone.map(todo => {
          return todo.id
        })
      } else {
        this.checkedTodos = []
      }
      this.isIndeterminate = false
    },
    /**
     * 待处理待办项复选框组值变动时触发
     *
     * @param {Array} value 复选框组值变动后的值
     */
    handleCheckedTodosChange(value) {
      let checkedCount = value.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.todosData.undone.length
      this.checkAll = checkedCount === this.todosData.undone.length
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
